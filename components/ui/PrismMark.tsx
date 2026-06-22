import { cn } from "@/lib/cn";

/**
 * Vercel 스타일 프리즘 삼각형 로고 마크.
 * 색은 currentColor 를 따른다 (기본 graphite).
 */
export function PrismMark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 22"
      fill="none"
      aria-hidden="true"
      className={cn("text-graphite", className)}
    >
      <path d="M12 1 L23 21 L1 21 Z" fill="currentColor" />
    </svg>
  );
}

/**
 * 프리즘 마크 + 그 뒤로 번지는 conic 그라데이션.
 * 시스템에서 유일한 채색 순간이므로 화면당 한 번만 사용한다.
 */
export function PrismHeroMark({
  size = 56,
  glow = 220,
}: {
  size?: number;
  glow?: number;
}) {
  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden="true"
        className="prism-glow absolute rounded-full"
        style={{
          width: glow,
          height: glow,
          left: "50%",
          top: "60%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <PrismMark size={size} className="relative" />
    </span>
  );
}
