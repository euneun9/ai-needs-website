"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { PostList } from "@/components/PostList";
import { WelcomeModal } from "@/components/WelcomeModal";
import { RequestForm } from "@/components/RequestForm";
import { PostDetail } from "@/components/PostDetail";
import { addPost, getPosts } from "@/lib/posts";
import type { NewPost, Post } from "@/lib/types";

const VISITED_KEY = "ai-request-board:visited";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // 최초 마운트: 글 불러오기 + 첫 방문 시 환영 팝업
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getPosts();
        if (!cancelled) setPosts(data);
      } catch {
        if (!cancelled) {
          setLoadError("요청 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    try {
      if (!window.localStorage.getItem(VISITED_KEY)) {
        setWelcomeOpen(true);
      }
    } catch {
      /* localStorage 사용 불가 시 팝업 생략 */
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // 방문 플래그는 팝업을 실제로 닫거나 신청할 때 기록한다
  // (마운트 시 곧바로 기록하면 StrictMode 이중 실행으로 팝업이 사라진다)
  function markVisited() {
    try {
      window.localStorage.setItem(VISITED_KEY, "1");
    } catch {
      /* 무시 */
    }
  }

  function closeWelcome() {
    setWelcomeOpen(false);
    markVisited();
  }

  function openForm() {
    setWelcomeOpen(false);
    markVisited();
    setFormOpen(true);
  }

  async function handleSubmit(input: NewPost) {
    const created = await addPost(input);
    setPosts((prev) => [created, ...prev]);
    setLoadError(null);
    setFormOpen(false);
    // 제출 후 목록으로 부드럽게 이동
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function scrollToList() {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader onNewRequest={openForm} />

      <main className="flex-1">
        <Hero onApply={openForm} onBrowse={scrollToList} />

        <div
          ref={listRef}
          className="mx-auto max-w-[960px] scroll-mt-20 px-6 py-16"
        >
          {loadError ? (
            <div className="rounded-[6px] border border-dashed border-hairline bg-pearl px-6 py-16 text-center">
              <p className="text-[14px] tracking-[-0.01em] text-felt">
                {loadError}
              </p>
            </div>
          ) : (
            <PostList
              posts={posts}
              loading={loading}
              onSelect={setSelectedPost}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-1 px-6 py-8 text-center">
          <p className="text-[12px] tracking-[-0.01em] text-smoke">
            요청 데이터는 Supabase 에 저장됩니다
          </p>
          <p className="text-[12px] tracking-[-0.01em] text-ash">
            부서별 AI 요청 게시판
          </p>
        </div>
      </footer>

      <WelcomeModal
        open={welcomeOpen}
        onClose={closeWelcome}
        onApply={openForm}
      />
      <RequestForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
      <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
