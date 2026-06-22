import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 브라우저에서 직접 호출하는 Supabase 클라이언트 (지연 초기화).
 *
 * 이 앱은 클라이언트 전용이라 서버 비밀키를 둘 곳이 없다.
 * 따라서 "publishable(anon)" 키만 사용하고, 데이터 보호는 전적으로
 * Supabase 의 RLS(Row Level Security) 정책에 맡긴다.
 *   - posts 테이블: 누구나 SELECT / INSERT 가능, UPDATE / DELETE 불가
 *
 * 왜 모듈 최상단에서 throw 하지 않고 getSupabase() 로 감쌌나:
 *   throw 를 import 시점에 두면 next build(프리렌더)가 이 모듈을 평가할 때
 *   환경변수가 아직 없으면 "빌드 자체"가 깨진다. Vercel/Render 처럼 대시보드에서
 *   env 를 넣는 환경에서 빌드 실패를 막기 위해, 실제 호출 시점(클라이언트)으로
 *   초기화를 미룬다. env 가 없으면 그때 throw 되고, 화면은 graceful 에러 UI 로
 *   떨어진다(빈 화면/빌드 실패 대신).
 *
 * NEXT_PUBLIC_ 값은 빌드 시점에 번들로 인라인되므로, 배포 플랫폼의 환경변수에
 * 두 값을 설정한 뒤 빌드해야 실제 연결이 동작한다.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase 환경변수가 없습니다. NEXT_PUBLIC_SUPABASE_URL 과 " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY 를 (로컬은 .env.local, 배포는 플랫폼 환경변수에) 설정하세요.",
    );
  }

  client = createClient(url, anonKey);
  return client;
}
