"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Modal, ModalClose } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Field, TextInput, TextArea } from "@/components/ui/Field";
import type { NewPost } from "@/lib/types";

type Errors = Partial<Record<keyof NewPost, string>>;

const empty: NewPost = { team: "", title: "", content: "" };

/**
 * 팀명 / 제목 / 내용을 입력하는 요청 작성 폼 (익명).
 */
export function RequestForm({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewPost) => void | Promise<void>;
}) {
  const [values, setValues] = useState<NewPost>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 열릴 때마다 초기화
  useEffect(() => {
    if (open) {
      setValues(empty);
      setErrors({});
      setSubmitting(false);
      setSubmitError(null);
    }
  }, [open]);

  function update<K extends keyof NewPost>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(v: NewPost): Errors {
    const next: Errors = {};
    if (!v.team.trim()) next.team = "팀명을 입력해주세요.";
    if (!v.title.trim()) next.title = "제목을 입력해주세요.";
    if (!v.content.trim()) next.content = "내용을 입력해주세요.";
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit({
        team: values.team.trim(),
        title: values.title.trim(),
        content: values.content.trim(),
      });
    } catch {
      setSubmitError("등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="form-title" className="max-w-lg">
      <form onSubmit={handleSubmit}>
        <header className="flex items-start justify-between border-b border-hairline px-6 py-5">
          <div>
            <h2
              id="form-title"
              className="text-[18px] font-semibold tracking-[-0.02em] text-graphite"
            >
              AI 요청 작성
            </h2>
            <p className="mt-1 text-[13px] tracking-[-0.01em] text-smoke">
              익명으로 등록됩니다. 어떤 AI가 필요한지 편하게 적어주세요.
            </p>
          </div>
          <ModalClose onClick={onClose} />
        </header>

        <div className="flex flex-col gap-4 px-6 py-5">
          <Field id="team" label="팀명" required error={errors.team}>
            <TextInput
              id="team"
              value={values.team}
              onChange={(e) => update("team", e.target.value)}
              placeholder="예: 민원봉사과"
              maxLength={40}
              autoFocus
              invalid={!!errors.team}
            />
          </Field>

          <Field id="title" label="제목" required error={errors.title}>
            <TextInput
              id="title"
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="필요한 AI를 한 줄로 요약해주세요"
              maxLength={80}
              invalid={!!errors.title}
            />
          </Field>

          <Field
            id="content"
            label="내용"
            required
            error={errors.content}
            hint="어떤 업무에서, 어떻게 쓰고 싶은지 적어주세요."
          >
            <TextArea
              id="content"
              value={values.content}
              onChange={(e) => update("content", e.target.value)}
              placeholder="현재 어떤 점이 번거로운지, AI가 무엇을 해주면 좋을지 자유롭게 적어주세요."
              rows={6}
              maxLength={1000}
              invalid={!!errors.content}
            />
          </Field>
        </div>

        <footer className="flex items-center justify-end gap-3 border-t border-hairline px-6 py-4">
          {submitError && (
            <p className="mr-auto text-[13px] tracking-[-0.01em] text-prism-red">
              {submitError}
            </p>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={submitting}
          >
            취소
          </Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "등록 중…" : "등록하기"}
          </Button>
        </footer>
      </form>
    </Modal>
  );
}
