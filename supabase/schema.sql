-- 부서별 AI 요청 게시판 — Supabase 스키마
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 한 번 실행하세요.

-- 1) posts 테이블
--    앱의 입력 제한(팀 40 / 제목 80 / 내용 1000자)을 DB 에서도 강제한다.
create table if not exists public.posts (
  id         uuid        primary key default gen_random_uuid(),
  team       text        not null check (char_length(team) between 1 and 40),
  title      text        not null check (char_length(title) between 1 and 80),
  content    text        not null check (char_length(content) between 1 and 1000),
  created_at timestamptz not null default now()
);

-- 2) 최신순 조회용 인덱스
create index if not exists posts_created_at_idx
  on public.posts (created_at desc);

-- 3) RLS 활성화 — 정책 없이는 모든 접근이 차단된다.
alter table public.posts enable row level security;

-- 4) 정책: 누구나 읽기 / 작성 가능, 수정·삭제는 불가(정책 없음 → 거부)
drop policy if exists "Anyone can read posts" on public.posts;
create policy "Anyone can read posts"
  on public.posts for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can insert posts" on public.posts;
create policy "Anyone can insert posts"
  on public.posts for insert
  to anon, authenticated
  with check (true);

-- 5) (선택) 샘플 글 — 첫 화면을 비워두지 않으려면 함께 실행
insert into public.posts (team, title, content, created_at) values
  ('민원봉사과', '민원 응대 초안을 자동으로 써주는 AI',
   '하루에도 비슷한 민원 답변을 수십 건씩 작성합니다. 민원 내용을 붙여넣으면 규정에 맞는 답변 초안을 만들어 주는 AI가 있으면 응대 속도가 훨씬 빨라질 것 같아요. 말투는 정중하게, 근거 조항도 같이 달아주면 좋겠습니다.',
   '2026-06-09T01:20:00Z'),
  ('세무과', '엑셀 세입 자료 요약·검증 도우미',
   '매달 세입 현황 엑셀을 취합하는데 부서마다 양식이 조금씩 달라 정리가 오래 걸립니다. 여러 시트를 한 번에 읽어 합계를 맞춰주고, 이상한 값(음수·중복)을 찾아주는 AI가 필요합니다.',
   '2026-06-10T05:45:00Z'),
  ('홍보담당관', '보도자료를 카드뉴스 문구로 바꿔주는 AI',
   '보도자료를 작성하고 나면 SNS용 카드뉴스 문구로 다시 다듬는 작업을 반복합니다. 긴 보도자료를 핵심만 뽑아 시민이 읽기 쉬운 짧은 문장으로 바꿔주는 도구가 있으면 좋겠어요.',
   '2026-06-10T23:10:00Z');
