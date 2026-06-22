/** 조건부 className 병합 (falsy 값 제거) */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
