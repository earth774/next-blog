"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Square, Volume2 } from "lucide-react";
import { chunkSpeechText, pickPreferredVoice } from "@/lib/article-speech";

type Playback = "idle" | "playing" | "paused";

const PRIMARY_BUTTON_CLASS =
  "inline-flex items-center gap-2 border border-[var(--am-border)] bg-transparent px-3.5 py-2 text-[14px] leading-none text-[var(--am-text-primary)] transition-colors hover:border-[var(--am-accent)] hover:text-[var(--am-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--am-accent)]";

const STOP_BUTTON_CLASS =
  "inline-flex items-center gap-2 border border-[var(--am-border)] bg-transparent px-3.5 py-2 text-[14px] leading-none text-[var(--am-text-secondary)] transition-colors hover:border-[var(--am-accent)] hover:text-[var(--am-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--am-accent)]";

function subscribeToSpeechSupport() {
  return () => {};
}

function getSpeechSupportSnapshot() {
  return isSpeechSupported();
}

function getServerSpeechSupportSnapshot() {
  return true;
}

function isSpeechSupported() {
  return (
    typeof window !== "undefined" &&
    typeof window.speechSynthesis?.speak === "function" &&
    typeof window.speechSynthesis.cancel === "function" &&
    typeof window.SpeechSynthesisUtterance === "function"
  );
}

function primaryLabel(playback: Playback): string {
  switch (playback) {
    case "playing":
      return "หยุดชั่วคราว";
    case "idle":
    case "paused":
      return "ฟังบทความ";
    default: {
      const exhaustive: never = playback;
      return exhaustive;
    }
  }
}

function primaryAriaLabel(playback: Playback): string {
  switch (playback) {
    case "playing":
      return "หยุดชั่วคราว";
    case "paused":
      return "ฟังบทความต่อ";
    case "idle":
      return "ฟังบทความ";
    default: {
      const exhaustive: never = playback;
      return exhaustive;
    }
  }
}

function liveStatus(playback: Playback): string {
  switch (playback) {
    case "playing":
      return "กำลังอ่านบทความ";
    case "paused":
      return "หยุดอ่านชั่วคราว";
    case "idle":
      return "";
    default: {
      const exhaustive: never = playback;
      return exhaustive;
    }
  }
}

function assignUtteranceVoice(utterance: SpeechSynthesisUtterance) {
  const voice = pickPreferredVoice(window.speechSynthesis.getVoices());
  if (!voice) {
    utterance.lang = "th-TH";
    return;
  }

  utterance.voice = voice;
  utterance.lang = voice.lang;
}

/**
 * Reads the current post aloud with the browser speech engine.
 * Playback starts only from a button press and is cancelled when the reader leaves.
 */
export default function ArticleListen({ text }: { text: string }) {
  const isSupported = useSyncExternalStore(
    subscribeToSpeechSupport,
    getSpeechSupportSnapshot,
    getServerSpeechSupportSnapshot,
  );
  const [playback, setPlayback] = useState<Playback>("idle");
  const [hasError, setHasError] = useState(false);
  const [trackedText, setTrackedText] = useState(text);
  const playbackRef = useRef<Playback>("idle");
  const runIdRef = useRef(0);
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const startTimerRef = useRef<number | null>(null);

  if (text !== trackedText) {
    setTrackedText(text);
    setPlayback("idle");
    setHasError(false);
  }

  useEffect(() => {
    playbackRef.current = playback;
  }, [playback]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth || typeof synth.speak !== "function" || typeof synth.getVoices !== "function") {
      return;
    }

    const primeVoices = () => {
      synth.getVoices();
    };
    primeVoices();
    synth.addEventListener("voiceschanged", primeVoices);

    const cancelSpeech = () => {
      if (startTimerRef.current !== null) {
        window.clearTimeout(startTimerRef.current);
        startTimerRef.current = null;
      }
      runIdRef.current += 1;
      playbackRef.current = "idle";
      if (synth.paused) synth.resume();
      synth.cancel();
    };

    const stopForPageHide = () => {
      cancelSpeech();
      setPlayback("idle");
    };

    window.addEventListener("pagehide", stopForPageHide);

    return () => {
      synth.removeEventListener("voiceschanged", primeVoices);
      window.removeEventListener("pagehide", stopForPageHide);
      cancelSpeech();
    };
  }, [text]);

  if (!text.trim()) return null;

  const speakFrom = (index: number, runId: number) => {
    if (runId !== runIdRef.current || !isSpeechSupported()) return;

    const chunk = chunksRef.current[index];
    if (!chunk) {
      playbackRef.current = "idle";
      indexRef.current = 0;
      setPlayback("idle");
      return;
    }

    indexRef.current = index;
    try {
      const utterance = new SpeechSynthesisUtterance(chunk);
      assignUtteranceVoice(utterance);

      utterance.onend = () => {
        if (runId !== runIdRef.current) return;
        const nextIndex = index + 1;
        indexRef.current = nextIndex;
        if (playbackRef.current !== "playing") return;
        speakFrom(nextIndex, runId);
      };

      utterance.onerror = (event) => {
        if (runId !== runIdRef.current) return;
        if (event.error === "canceled" || event.error === "interrupted") return;
        playbackRef.current = "idle";
        setPlayback("idle");
        setHasError(true);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      playbackRef.current = "idle";
      setPlayback("idle");
      setHasError(true);
    }
  };

  const play = () => {
    if (!isSpeechSupported()) return;
    setHasError(false);
    const synth = window.speechSynthesis;

    if (playback === "paused") {
      playbackRef.current = "playing";
      setPlayback("playing");
      if (synth.paused) {
        synth.resume();
        return;
      }
      if (!synth.speaking) speakFrom(indexRef.current, runIdRef.current);
      return;
    }

    const chunks = chunkSpeechText(text);
    if (chunks.length === 0) return;

    chunksRef.current = chunks;
    indexRef.current = 0;
    runIdRef.current += 1;
    const runId = runIdRef.current;
    playbackRef.current = "playing";
    setPlayback("playing");

    const queueWasBusy = synth.speaking || synth.pending || synth.paused;
    if (synth.paused) synth.resume();
    if (synth.speaking || synth.pending) synth.cancel();

    if (!queueWasBusy) {
      speakFrom(0, runId);
      return;
    }

    startTimerRef.current = window.setTimeout(() => {
      startTimerRef.current = null;
      speakFrom(0, runId);
    }, 0);
  };

  const pause = () => {
    if (!isSpeechSupported()) return;
    playbackRef.current = "paused";
    setPlayback("paused");
    window.speechSynthesis.pause();
  };

  const stop = () => {
    if (!isSpeechSupported()) return;
    if (startTimerRef.current !== null) {
      window.clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
    }
    runIdRef.current += 1;
    playbackRef.current = "idle";
    indexRef.current = 0;
    chunksRef.current = [];
    setPlayback("idle");
    const synth = window.speechSynthesis;
    if (synth.paused) synth.resume();
    synth.cancel();
    playButtonRef.current?.focus();
  };

  if (!isSupported) {
    return (
      <p
        className="text-[13px] text-[var(--am-text-muted)]"
        role="status"
      >
        เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง
      </p>
    );
  }

  const isPlaying = playback === "playing";
  const label = primaryLabel(playback);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="อ่านบทความเป็นเสียง">
        <button
          ref={playButtonRef}
          type="button"
          className={`${PRIMARY_BUTTON_CLASS} ${isPlaying ? "border-[var(--am-accent)] bg-[var(--am-accent-soft)] text-[var(--am-accent)]" : ""}`}
          onClick={isPlaying ? pause : play}
          aria-pressed={isPlaying}
          aria-label={primaryAriaLabel(playback)}
        >
          {isPlaying ? (
            <Pause size={14} aria-hidden="true" />
          ) : (
            <Volume2 size={14} aria-hidden="true" />
          )}
          {label}
        </button>
        {playback === "idle" ? null : (
          <button type="button" className={STOP_BUTTON_CLASS} onClick={stop} aria-label="หยุด">
            <Square size={12} aria-hidden="true" />
            หยุด
          </button>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {liveStatus(playback)}
      </p>
      {hasError ? (
        <p className="text-[13px] text-[var(--am-text-secondary)]" role="alert">
          อ่านออกเสียงไม่สำเร็จ ลองอีกครั้ง
        </p>
      ) : null}
    </div>
  );
}
