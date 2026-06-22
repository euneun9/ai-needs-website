import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const controlBase =
  "w-full rounded-[6px] border bg-pearl px-3 py-2 text-[14px] text-graphite " +
  "placeholder:text-ash transition-colors focus:outline-none " +
  "focus:border-graphite focus:ring-2 focus:ring-graphite/10";

function controlBorder(invalid?: boolean) {
  return invalid ? "border-prism-red focus:border-prism-red" : "border-hairline";
}

/** 라벨 + 컨트롤 + 하단 보조 텍스트(글자수/에러)를 감싸는 필드 셸 */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[13px] font-medium tracking-[-0.01em] text-felt"
      >
        {label}
        {required && <span className="ml-0.5 text-prism-red">*</span>}
      </label>
      {children}
      {(error || hint) && (
        <p
          className={cn(
            "text-[12px] leading-[1.4]",
            error ? "text-prism-red" : "text-smoke",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  invalid,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn(controlBase, controlBorder(invalid), className)}
      {...props}
    />
  );
}

export function TextArea({
  invalid,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(
        controlBase,
        controlBorder(invalid),
        "resize-y leading-[1.6]",
        className,
      )}
      {...props}
    />
  );
}
