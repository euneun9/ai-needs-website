"use client";

import { Modal, ModalClose } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PrismHeroMark } from "@/components/ui/PrismMark";

/**
 * 첫 방문 시 뜨는 환영 팝업.
 * [신청하기] → 입력 폼으로 이어진다.
 */
export function WelcomeModal({
  open,
  onClose,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="welcome-title" className="max-w-md">
      <div className="absolute right-3 top-3">
        <ModalClose onClick={onClose} />
      </div>

      <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center">
        <PrismHeroMark size={44} glow={170} />

        <h2
          id="welcome-title"
          className="mt-7 text-[24px] font-semibold leading-[1.25] tracking-[-0.04em] text-graphite"
        >
          당신의 부서는
          <br />
          AI가 필요하신가요?
        </h2>
        <p className="mt-3 max-w-[19rem] text-[15px] leading-[1.6] tracking-[-0.01em] text-felt">
          어떤 업무에 AI가 있으면 좋을지 편하게 이야기해주세요. 익명으로
          남길 수 있어요.
        </p>

        <div className="mt-7 flex w-full flex-col gap-2">
          <Button variant="primary" onClick={onApply} className="h-10 w-full">
            신청하기
          </Button>
          <Button variant="ghost" onClick={onClose} className="h-9 w-full">
            다음에 할게요
          </Button>
        </div>
      </div>
    </Modal>
  );
}
