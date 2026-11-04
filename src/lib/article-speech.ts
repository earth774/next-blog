const FENCED_CODE_BLOCK = /```[\s\S]*?```|~~~[\s\S]*?~~~/g;
const HTML_COMMENT = /<!--[\s\S]*?-->/g;
const HTML_EMBED =
  /<(script|style|iframe|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi;
const HTML_LINE_BREAK = /<br\s*\/?>/gi;
const HTML_BLOCK_END =
  /<\/(p|div|li|h[1-6]|tr|blockquote|section|article)>/gi;
const HTML_TAG = /<[^>]+>/g;
const MARKDOWN_IMAGE = /!\[[^\]]*\]\((?:[^()]|\([^)]*\))*\)|!\[[^\]]*\]\[[^\]]*\]/g;
const MARKDOWN_LINK = /\[([^\]]+)\]\((?:[^()]|\([^)]*\))*\)|\[([^\]]+)\]\[[^\]]*\]/g;
const LINK_DEFINITION = /^\s*\[[^\]]+\]:\s+\S+.*$/gm;
const BARE_URL = /https?:\/\/\S+/g;
const BLOCKQUOTE_MARKER = /^>\s?/gm;
const HORIZONTAL_RULE = /^ {0,3}([-*_])\1{2,}\s*$/gm;
const TASK_LIST_LINE = /^[-*+]\s+\[[ xX]\]\s+(.*)$/;
const UNORDERED_LIST_LINE = /^[-*+]\s+(.*)$/;
const ORDERED_LIST_LINE = /^\d+[.)]\s+(.*)$/;
const HEADING = /^#{1,6}\s+(.+?)\s*#*\s*$/gm;
const INLINE_CODE = /`([^`\n]+)`/g;
const STRIKE = /~~([^~\n]+)~~/g;
const BOLD = /\*\*([^*]+)\*\*|__([^_]+)__/g;
const ESCAPED_MARKDOWN = /\\([\\`*_{}[\]()#+\-.!])/g;
const FOOTNOTE = /\[\^[^\]]+\]/g;
const TABLE_SEPARATOR =
  /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/;
const NUMERIC_ENTITY = /&#(\d+);/g;
const HEX_ENTITY = /&#x([0-9a-f]+);/gi;
const NAMED_ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
};

const DEFAULT_CHUNK_LENGTH = 140;

export interface SpeechVoiceChoice {
  lang: string;
  localService?: boolean;
  default?: boolean;
}

/**
 * Prefer a Thai voice, then the browser default.
 * Local Thai voices win so playback does not depend on a network voice.
 */
export function pickPreferredVoice<T extends SpeechVoiceChoice>(
  voices: readonly T[],
): T | undefined {
  const thaiVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith("th"),
  );
  const localThai =
    thaiVoices.find(
      (voice) => voice.localService && voice.lang.toLowerCase() === "th-th",
    ) ?? thaiVoices.find((voice) => voice.localService);
  if (localThai) return localThai;

  const thaiVoice =
    thaiVoices.find((voice) => voice.lang.toLowerCase() === "th-th") ??
    thaiVoices[0];
  if (thaiVoice) return thaiVoice;

  return voices.find((voice) => voice.default) ?? voices[0];
}

/**
 * Title plus article body, as sentences a speech engine can read.
 * Code fences, HTML, and markdown markers are removed. Heading text is kept.
 */
export function buildArticleSpeechText(title: string, markdown: string): string {
  const spokenTitle = toSentence(collapseWhitespace(stripInlineMarkdown(title)));
  const spokenBody = markdownToSpeech(markdown);
  if (!spokenTitle) return spokenBody;
  if (!spokenBody) return spokenTitle;
  return `${spokenTitle}\n\n${spokenBody}`;
}

/** Split speech text on sentence boundaries so each utterance stays short. */
export function chunkSpeechText(
  text: string,
  maxLength = DEFAULT_CHUNK_LENGTH,
): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const chunks: string[] = [];
  let current = "";

  const flush = () => {
    const trimmed = current.trim();
    if (trimmed) chunks.push(trimmed);
    current = "";
  };

  for (const sentence of normalized.split(/(?<=[.!?…。])\s+/)) {
    for (const piece of splitLongSegment(sentence, maxLength)) {
      const next = current ? `${current} ${piece}` : piece;
      if (current && next.length > maxLength) {
        flush();
        current = piece;
      } else {
        current = next;
      }
    }
  }

  flush();
  return chunks;
}

function markdownToSpeech(markdown: string): string {
  const withoutCode = markdown.replace(FENCED_CODE_BLOCK, "\n");
  const withoutHtml = decodeEntities(stripHtml(withoutCode));
  const withoutLinks = stripLinks(withoutHtml);
  const structured = stripStructure(withoutLinks);
  const plain = speakTableLines(stripInlineMarkdown(structured));
  return sentencesFromLines(plain);
}

function stripHtml(input: string): string {
  return input
    .replace(HTML_COMMENT, " ")
    .replace(HTML_EMBED, " ")
    .replace(HTML_LINE_BREAK, "\n")
    .replace(HTML_BLOCK_END, "\n")
    .replace(HTML_TAG, " ");
}

function decodeEntities(input: string): string {
  const named = Object.entries(NAMED_ENTITIES).reduce(
    (text, [entity, value]) => text.replaceAll(entity, value),
    input,
  );
  return named
    .replace(NUMERIC_ENTITY, (_match, code: string) =>
      fromCodePoint(Number(code)),
    )
    .replace(HEX_ENTITY, (_match, hex: string) =>
      fromCodePoint(Number.parseInt(hex, 16)),
    );
}

function fromCodePoint(value: number): string {
  if (!Number.isFinite(value) || value < 0 || value > 0x10ffff) return "";
  return String.fromCodePoint(value);
}

function stripLinks(input: string): string {
  return input
    .replace(MARKDOWN_IMAGE, " ")
    .replace(
      MARKDOWN_LINK,
      (_match, inlineLabel: string | undefined, refLabel: string | undefined) =>
        inlineLabel ?? refLabel ?? "",
    )
    .replace(LINK_DEFINITION, "")
    .replace(BARE_URL, " ");
}

function stripStructure(input: string): string {
  const withoutQuotes = stripBlockquotes(input)
    .split("\n")
    .map((line) => {
      const content = listItemContent(line.trim());
      return content === null ? line : toSentence(content);
    })
    .join("\n");

  return withoutQuotes
    .replace(HEADING, (_match, heading: string) => `\n${toSentence(heading.trim())}\n`)
    .replace(HORIZONTAL_RULE, "\n");
}

function listItemContent(line: string): string | null {
  const task = line.match(TASK_LIST_LINE);
  if (task) return task[1] ?? "";
  const unordered = line.match(UNORDERED_LIST_LINE);
  if (unordered) return unordered[1] ?? "";
  const ordered = line.match(ORDERED_LIST_LINE);
  if (ordered) return ordered[1] ?? "";
  return null;
}

function stripBlockquotes(input: string): string {
  let current = input;
  let previous = "";
  while (current !== previous) {
    previous = current;
    current = current.replace(BLOCKQUOTE_MARKER, "");
  }
  return current;
}

function stripInlineMarkdown(input: string): string {
  return input
    .replace(INLINE_CODE, "$1")
    .replace(STRIKE, "$1")
    .replace(BOLD, (_match, starText: string | undefined, underscoreText: string | undefined) => {
      return starText ?? underscoreText ?? "";
    })
    .replace(/(^|[\s([{])\*([^*\n]+)\*/g, "$1$2")
    .replace(/(^|[\s([{])_([^_\n]+)_/g, "$1$2")
    .replace(FOOTNOTE, "")
    .replace(ESCAPED_MARKDOWN, "$1");
}

function speakTableLines(input: string): string {
  return input
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed.includes("|")) return line;
      if (TABLE_SEPARATOR.test(trimmed)) return "";
      const cellCount = trimmed.split("|").length;
      if (!trimmed.startsWith("|") && cellCount < 3) return line;
      const cells = trimmed
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0);
      return cells.join(". ");
    })
    .join("\n");
}

function toSentence(value: string): string {
  const trimmed = value.trim().replace(/[:：]\s*$/, "");
  if (!trimmed) return "";
  return /[.!?…。]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function collapseWhitespace(input: string): string {
  return input
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+([,.;!?])/g, "$1")
    .trim();
}

/** Join hard-wrapped lines, and keep list items and paragraphs as separate sentences. */
function sentencesFromLines(input: string): string {
  const parts: string[] = [];
  let buffer = "";

  const flush = () => {
    const sentence = toSentence(buffer.replace(/[ \t]{2,}/g, " ").trim());
    if (sentence) parts.push(sentence);
    buffer = "";
  };

  for (const line of input.replace(/\r\n/g, "\n").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    buffer = buffer ? `${buffer} ${trimmed}` : trimmed;
    if (/[.!?…。]$/.test(trimmed)) flush();
  }

  flush();
  return parts.join(" ");
}

function splitLongSegment(segment: string, maxLength: number): string[] {
  if (segment.length <= maxLength) return [segment];

  const pieces: string[] = [];
  let rest = segment.trim();
  while (rest.length > maxLength) {
    const window = rest.slice(0, maxLength + 1);
    const spaceAt = window.lastIndexOf(" ");
    const cut = spaceAt >= Math.floor(maxLength * 0.5) ? spaceAt : maxLength;
    const piece = rest.slice(0, cut).trim();
    if (!piece) break;
    pieces.push(piece);
    rest = rest.slice(cut).trim();
  }
  if (rest) pieces.push(rest);
  return pieces;
}
