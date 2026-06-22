import { TeamChip } from "@/components/ui/TeamChip";
import { formatRelative } from "@/lib/format";
import type { Post } from "@/lib/types";

/** 목록의 개별 게시글 카드 — 클릭하면 상세 모달이 열린다. */
export function PostCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full flex-col gap-3 rounded-[6px] border border-hairline bg-pearl p-6 text-left transition-colors duration-150 hover:border-graphite/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite/15"
    >
      <div className="flex items-center justify-between gap-3">
        <TeamChip team={post.team} />
        <span className="shrink-0 text-[12px] tracking-[-0.01em] text-smoke">
          {formatRelative(post.createdAt)}
        </span>
      </div>

      <h3 className="text-[17px] font-semibold leading-[1.35] tracking-[-0.02em] text-graphite">
        {post.title}
      </h3>

      <p className="line-clamp-2 text-[14px] leading-[1.6] tracking-[-0.01em] text-felt">
        {post.content}
      </p>

      <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium tracking-[-0.01em] text-smoke transition-colors group-hover:text-graphite">
        자세히 보기
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M5 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
