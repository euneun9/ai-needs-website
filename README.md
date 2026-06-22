# 부서별 AI 요청 게시판 (AI Needs Board)

> 직원 누구나 **"우리 부서에 이런 AI가 있으면 좋겠다"**를 익명으로 남기는 사내 요청 게시판.

업무에서 번거로운 일을 익명으로 적어두면, 어떤 AI 도구가 실제로 필요한지 부서별로 모아 볼 수 있습니다.

## ✨ 주요 기능

- **익명 요청 작성** — 팀명 · 제목 · 내용만으로 간편하게 등록
- **요청 목록 / 상세 보기** — 최신순 카드 목록, 클릭 시 상세 모달
- **첫 방문 환영 팝업** — 처음 들어온 방문자에게 작성 안내
- **Supabase 영속 저장** — 작성한 글이 새로고침·다른 기기에서도 그대로 유지
- **Vercel 스타일 디자인 시스템** — Geist 폰트, 모노크롬 + 단일 프리즘 액센트 (자세한 토큰은 [`DESIGN.md`](DESIGN.md))

## 🧱 기술 스택

| 영역 | 사용 기술 |
|------|-----------|
| 프레임워크 | Next.js 16 (App Router) + React 19 |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| 데이터 | Supabase (Postgres + RLS), 브라우저에서 직접 호출 |
| 배포 | GitHub Pages (정적 export) / Vercel |

## 🚀 로컬 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

[`.env.local.example`](.env.local.example)을 `.env.local`로 복사한 뒤 값을 채웁니다.

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable(anon) key>
```

> Supabase 대시보드 → **Project Settings → API** 에서 Project URL 과 publishable(anon) 키를 확인할 수 있습니다.
> 두 값은 클라이언트 번들에 노출되지만 RLS 정책으로 보호되므로 안전합니다. `service_role` 키는 절대 넣지 마세요.

### 3. 데이터베이스 준비

Supabase 대시보드 → **SQL Editor** 에서 [`supabase/schema.sql`](supabase/schema.sql)을 한 번 실행합니다.
`posts` 테이블 + 인덱스 + RLS 정책(누구나 읽기·작성, 수정·삭제 차단) + 샘플 글이 생성됩니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 🗂 프로젝트 구조

```
app/
  layout.tsx        # 루트 레이아웃 (Geist 폰트, 메타데이터)
  page.tsx          # 메인 화면 — 목록/모달 조립, 데이터 로딩
  globals.css       # 디자인 토큰 (@theme) + 애니메이션
components/
  Hero, SiteHeader, PostList, PostCard, PostDetail,
  RequestForm, WelcomeModal
  ui/               # Button, Field, Modal, TeamChip, PrismMark
lib/
  supabase.ts       # 브라우저용 Supabase 클라이언트
  posts.ts          # 데이터 레이어 (getPosts / addPost)
  types.ts          # Post / NewPost 타입
  format.ts, cn.ts  # 유틸
supabase/
  schema.sql        # 테이블 + RLS + 샘플 데이터
```

## 🗃 데이터 모델

`posts` 테이블 (자세한 정의는 [`supabase/schema.sql`](supabase/schema.sql)):

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | uuid | 기본 키 (자동 생성) |
| `team` | text | 팀명 (1–40자) |
| `title` | text | 제목 (1–80자) |
| `content` | text | 내용 (1–1000자) |
| `created_at` | timestamptz | 작성 시각 (자동) |

**보안(RLS):** 익명 사용자는 **읽기(SELECT)와 작성(INSERT)만** 가능하며, 수정·삭제는 정책이 없어 차단됩니다. 데이터 레이어(`lib/posts.ts`)는 DB의 snake_case(`created_at`)와 앱의 camelCase(`createdAt`)를 한 곳에서 변환합니다.

## 📦 배포

이 레포를 GitHub 연동으로 Vercel 또는 Render에 배포할 수 있습니다.
**어느 쪽이든 빌드 전에 아래 환경변수 2개를 플랫폼에 반드시 등록**해야 실제 데이터가 연결됩니다.

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

> 환경변수가 없어도 **빌드는 실패하지 않습니다.** (클라이언트는 지연 초기화됩니다.)
> 다만 값이 없으면 화면에 "요청 목록을 불러오지 못했습니다" 안내가 표시되니, 배포 전에 꼭 등록하세요.

### Vercel (권장)

1. Vercel에서 이 GitHub 레포를 Import — Next.js가 자동 감지됩니다.
2. **Settings → Environment Variables** 에 위 두 값을 추가.
3. Deploy. 루트 도메인(`/`)에서 서빙됩니다.

### Render

**Web Service** 로 생성하고 다음을 설정합니다.

| 항목 | 값 |
|------|-----|
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Environment | 위 두 환경변수 등록 |

> Next.js는 Render가 주입하는 `PORT` 환경변수를 자동으로 사용합니다.

### (선택) GitHub Pages 정적 배포

`GITHUB_PAGES=true npm run build` 로 빌드하면 [`next.config.ts`](next.config.ts)가 `output: "export"` + `basePath`를 적용해 `out/`을 생성합니다. 이 경우 `basePath`를 레포 이름(`/ai-needs-website`)에 맞춰야 합니다.

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
