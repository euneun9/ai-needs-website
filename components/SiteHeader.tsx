import { Button } from "@/components/ui/Button";
import { PrismMark } from "@/components/ui/PrismMark";

/** 상단 고정 네비게이션 바. */
export function SiteHeader({ onNewRequest }: { onNewRequest: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-marble/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <PrismMark size={18} />
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-graphite">
            AI 요청 게시판
          </span>
        </div>
        <Button variant="primary" size="sm" onClick={onNewRequest}>
          새 요청 작성
        </Button>
      </div>
    </header>
  );
}
