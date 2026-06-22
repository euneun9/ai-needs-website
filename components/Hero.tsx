import { Button } from "@/components/ui/Button";
import { PrismHeroMark } from "@/components/ui/PrismMark";

/** 히어로 — 브랜드 문구 + CTA + 프리즘 비주얼 (화면의 유일한 채색 순간). */
export function Hero({
  onApply,
  onBrowse,
}: {
  onApply: () => void;
  onBrowse: () => void;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      {/* 옅은 엔지니어 그리드 오버레이 */}
      <div className="engineer-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-6 pb-20 pt-20 text-center">
        <span className="mb-5 inline-flex items-center rounded-full border border-hairline bg-pearl px-3 py-1 text-[12px] font-medium tracking-[-0.01em] text-felt">
          익명 · 부서별 AI 요청
        </span>

        <h1 className="max-w-[18ch] text-[44px] font-semibold leading-[1.1] tracking-[-0.055em] text-graphite sm:text-[48px]">
          부서별 AI 요청 게시판
        </h1>
        <p className="mt-5 max-w-[34rem] text-[16px] leading-[1.6] tracking-[-0.01em] text-felt">
          당신의 부서에 어떤 AI가 필요한가요? 업무에서 번거로운 일을 익명으로
          편하게 남겨주세요.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" onClick={onApply} className="h-10 px-5">
            AI 신청하기
          </Button>
          <Button variant="outline" onClick={onBrowse} className="h-10 px-5">
            요청 둘러보기
          </Button>
        </div>

        <div className="mt-16">
          <PrismHeroMark size={56} glow={260} />
        </div>
      </div>
    </section>
  );
}
