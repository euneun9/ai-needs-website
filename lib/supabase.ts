import { createClient } from "@supabase/supabase-js";

/**
 * 브라우저에서 직접 호출하는 Supabase 클라이언트.
 *
 * 이 앱은 정적(static export) + 클라이언트 전용이라 서버 비밀키를 둘 곳이 없다.
 * 따라서 "publishable(anon)" 키만 사용하고, 데이터 보호는 전적으로
 * Supabase 의 RLS(Row Level Security) 정책에 맡긴다.
 *   - posts 테이블: 누구나 SELECT / INSERT 가능, UPDATE / DELETE 불가
 *
 * 두 환경변수는 빌드 시점에 번들로 인라인되므로(NEXT_PUBLIC_ 접두사),
 * GitHub Pages 용으로 빌드할 때 .env.local 에 값이 있어야 한다.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Supabase 환경변수가 없습니다. .env.local 에 " +
      "NEXT_PUBLIC_SUPABASE_URL 과 NEXT_PUBLIC_SUPABASE_ANON_KEY 를 설정하세요.",
  );
}

export const supabase = createClient(url, anonKey);
