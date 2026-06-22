import type { NewPost, Post } from "./types";
import { supabase } from "./supabase";

/**
 * 데이터 레이어 (Supabase)
 *
 * 화면 컴포넌트는 getPosts / addPost 시그니처에만 의존한다.
 * DB 컬럼은 snake_case(created_at)이고 앱 타입은 camelCase(createdAt)라
 * toPost 에서 한 번만 변환한다.
 */

const TABLE = "posts";

/** DB row(snake_case) → 앱 Post(camelCase) */
type Row = {
  id: string;
  team: string;
  title: string;
  content: string;
  created_at: string;
};

function toPost(row: Row): Post {
  return {
    id: row.id,
    team: row.team,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  };
}

/** 최신순 정렬된 전체 글. */
export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(toPost);
}

/** 새 글을 추가하고 저장된 글(서버가 채운 id/created_at 포함)을 반환한다. */
export async function addPost(input: NewPost): Promise<Post> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      team: input.team.trim(),
      title: input.title.trim(),
      content: input.content.trim(),
    })
    .select()
    .single();

  if (error) throw error;
  return toPost(data as Row);
}
