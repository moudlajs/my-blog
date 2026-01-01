export function getReadingTime(content: string | undefined): number {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}
