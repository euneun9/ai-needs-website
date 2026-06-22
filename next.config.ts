import type { NextConfig } from "next";

// 배포 대상에 따라 설정을 분기한다.
//
// - GitHub Pages: 주소가 https://euneun9.github.io/test3/ 처럼 "/test3" 하위 경로다.
//   → 정적 export(output: "export") + basePath "/test3" 가 필요하다.
//   → GitHub Pages 용으로 빌드할 때만 GITHUB_PAGES=true 로 켠다.
//
// - Vercel / 로컬 dev: 루트 도메인(/)에서 서빙한다.
//   → basePath 를 주면 루트가 404 나므로, 아무 설정도 주지 않는다.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isGithubPages
  ? {
      output: "export",
      basePath: "/test3",
      trailingSlash: true,
      images: {
        // 정적 export 에서는 기본 이미지 최적화를 쓸 수 없으므로 비활성화
        unoptimized: true,
      },
    }
  : {};

export default nextConfig;
