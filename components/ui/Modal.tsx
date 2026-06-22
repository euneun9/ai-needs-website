"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
  /** 너비 등 패널 클래스 오버라이드 */
  className?: string;
};

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
  className,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-graphite/40 animate-overlay-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          "relative z-10 w-full max-w-lg overflow-hidden rounded-[6px] border border-hairline bg-pearl",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_10px_34px_-14px_rgba(0,0,0,0.22)]",
          "animate-modal-in",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

/** 모달 우상단 닫기(X) 버튼 */
export function ModalClose({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="닫기"
      className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-smoke transition-colors hover:bg-graphite/[0.05] hover:text-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite/15"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M4 4l8 8M12 4l-8 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
