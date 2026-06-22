export type Post = {
  id: string;
  team: string; // 팀명
  title: string; // 제목
  content: string; // 내용
  createdAt: string; // ISO timestamp
};

/** 새 글 작성 시 입력값 (id/createdAt 은 데이터 레이어에서 생성) */
export type NewPost = Pick<Post, "team" | "title" | "content">;
