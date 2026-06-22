import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[6px] font-medium " +
  "tracking-[-0.01em] transition-colors duration-150 cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite/15 " +
  "disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-9 px-4 text-[14px]",
};

const variants: Record<Variant, string> = {
  // 채움: 시스템의 유일한 강조 — #171717 배경 + 흰 텍스트
  primary: "bg-graphite text-pearl hover:bg-black",
  // 아웃라인: 1px graphite 보더
  outline:
    "border border-graphite bg-transparent text-graphite hover:bg-graphite/[0.04]",
  // 고스트: 보더 없는 보조 액션
  ghost: "bg-transparent text-felt hover:bg-graphite/[0.04]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
