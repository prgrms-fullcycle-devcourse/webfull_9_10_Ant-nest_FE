# 달래 (Dallae)

> 감정을 기록하고, 공유하고, 위로받는 감정 다이어리 서비스

## 목차

- [소개](#소개)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [환경 변수](#환경-변수)
- [스크립트](#스크립트)

---

## 소개

**달래**는 하루의 감정을 기록하고, 캘린더로 돌아보며, 커뮤니티에서 다른 사람들과 공유할 수 있는 감정 다이어리 웹 애플리케이션입니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19, TypeScript |
| 빌드 도구 | Vite |
| 라우팅 | React Router DOM v7 |
| 상태 관리 | Zustand (클라이언트), TanStack React Query (서버) |
| UI / 스타일 | Material-UI, Tailwind CSS, Emotion |
| 폼 | React Hook Form |
| HTTP 클라이언트 | Axios |
| 기타 | Vite PWA Plugin, Husky |

---

## 시작하기

### 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd dallae

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 VITE_API_BASE_URL을 설정하세요

# 개발 서버 실행
npm run dev
```

---

## 프로젝트 구조

```
src/
├── assets/             # 폰트, 이미지, 감정 아이콘
├── components/
│   └── common/         # 공통 컴포넌트
├── features/           # 기능별 모듈
│   ├── auth/
│   ├── calendar/
│   ├── community/
│   ├── diary/
│   └── profile/
├── hooks/              # 커스텀 훅
├── layouts/            # 레이아웃 컴포넌트
│   ├── AuthLayout.tsx  # 로그인/회원가입 레이아웃
│   └── MainLayout.tsx  # 메인 레이아웃
├── pages/              # 페이지 컴포넌트
├── routes/             # 라우터 설정
├── services/           # API 통신 (Axios 인스턴스)
├── store/              # Zustand 스토어
├── styles/             # 글로벌 스타일, 폰트
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수
```

---

## 주요 기능

| 기능 | 경로 | 설명 |
|------|------|------|
| 홈 | `/` | 서비스 소개 및 내비게이션 |
| 로그인 | `/login` | 이메일/비밀번호 로그인 |
| 회원가입 | `/signup` | 닉네임/이메일/비밀번호 등록 |
| 다이어리 | `/diary` | 오늘의 감정과 일기 작성 |
| 캘린더 | `/calendar` | 날짜별 감정 기록 조회 |
| 커뮤니티 | `/community` | 공개 일기 공유 및 소통 |
| 프로필 | `/profile` | 내 정보 조회 및 수정 |

### 인증 플로우

- 로그인 성공 시 JWT 토큰을 `localStorage`에 저장 (Zustand persist)
- Axios 요청 인터셉터에서 자동으로 `Authorization: Bearer <token>` 헤더 추가
- 401 응답 시 인증 상태 초기화 후 `/login`으로 리다이렉트

---

## 환경 변수

`.env.example`을 참고하여 `.env` 파일을 생성하세요.

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 스크립트

```bash
npm run dev       # 개발 서버 실행 (HMR 지원)
npm run build     # 프로덕션 빌드
npm run preview   # 프로덕션 빌드 미리보기
npm run lint      # ESLint 검사
```
