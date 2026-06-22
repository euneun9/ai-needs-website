"use client";

import { Modal, ModalClose } from "@/components/ui/Modal";
import { TeamChip } from "@/components/ui/TeamChip";
import { formatDateTime } from "@/lib/format";
import type { Post } from "@/lib/types";

/** 게시글 상세 보기 모달. */
export function PostDetail({
  post,
  onClose,
}: {
  post: Post | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={!!post}
      onClose={onClose}
      labelledBy="detail-title"
      className="max-w-lg"
    >
      {post && (
        <article>
          <header className="flex items-start justify-between gap-3 border-b border-hairline px-6 py-5">
            <div className="flex flex-col gap-3">
              <TeamChip team={post.team} />
              <h2
                id="detail-title"
                className="text-[22px] font-semibold leading-[1.3] tracking-[-0.03em] text-graphite"
              >
                {post.title}
              </h2>
              <time className="text-[12px] tracking-[-0.01em] text-smoke">
                {formatDateTime(post.createdAt)}
              </time>
            </div>
            <ModalClose onClick={onClose} />
          </header>

          <div className="max-h-[55vh] overflow-y-auto px-6 py-6">
            <p className="whitespace-pre-wrap break-words text-[15px] leading-[1.7] tracking-[-0.01em] text-felt">
              {post.content}
            </p>
          </div>
        </article>
      )}
    </Modal>
  );
}
