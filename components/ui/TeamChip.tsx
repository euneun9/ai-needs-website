import { cn } from "@/lib/cn";

/** 팀명 표시용 pill 칩 (9999px 라운드) */
export function TeamChip({
  team,
  className,
}: {
  team: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-hairline bg-marble px-2.5 py-0.5",
        "text-[12px] font-medium tracking-[-0.01em] text-felt",
        className,
      )}
    >
      {team}
    </span>
  );
}
