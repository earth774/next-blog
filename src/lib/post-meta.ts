export function formatPostDate(dateValue: string) {
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return dateValue;
  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getReadingTime(content: string) {
  const plainText = content.replace(/[#*_`>\-\n]/g, " ").replace(/\s+/g, " ").trim();
  return `${Math.max(1, Math.round(plainText.length / 900))} min read`;
}

export function getExcerpt(content: string, maxLength = 130) {
  const plainText = content.replace(/[#*_`>\-\n]/g, " ").replace(/\s+/g, " ").trim();
  return plainText.length <= maxLength ? plainText : `${plainText.slice(0, maxLength).trim()}...`;
}
