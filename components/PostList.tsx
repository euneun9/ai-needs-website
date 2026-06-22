import { PostCard } from "@/components/PostCard";
import type { Post } from "@/lib/types";

/** 게시글 목록 섹션 — 헤더 + 카드 그리드. */
export function PostList({
  posts,
  loading = false,
  onSelect,
}: {
  posts: Post[];
  loading?: boolean;
  onSelect: (post: Post) => void;
}) {
  return (
    <section aria-labelledby="list-heading">
      <div className="mb-5 flex items-baseline justify-between">
        <h2
          id="list-heading"
          className="text-[20px] font-semibold tracking-[-0.03em] text-graphite"
        >
          요청 목록
        </h2>
        <span className="text-[13px] tracking-[-0.01em] text-smoke">
          {loading ? "불러오는 중…" : `총 ${posts.length}건`}
        </span>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[132px] animate-pulse rounded-[6px] border border-hairline bg-pearl"
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-[6px] border border-dashed border-hairline bg-pearl px-6 py-16 text-center">
          <p className="text-[14px] tracking-[-0.01em] text-felt">
            아직 등록된 요청이 없어요.
          </p>
          <p className="mt-1 text-[13px] tracking-[-0.01em] text-smoke">
            상단의 “새 요청 작성”으로 첫 요청을 남겨보세요.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => onSelect(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
