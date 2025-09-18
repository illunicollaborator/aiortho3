# AIOrtho

어린이 사경치료 의료처방 관리 시스템

## 개요

AIOrtho는 어린이 정형외과 전문 의료진을 위한 종합적인 처방 관리 플랫폼입니다. 의사와 간호사가 효율적으로 환자 정보를 관리하고 처방전을 작성할 수 있도록 설계되었습니다.

## 🛠 기술 스택

### Frontend

- **Next.js 15** - React 풀스택 프레임워크
- **React 19** - 사용자 인터페이스 라이브러리
- **TypeScript** - 정적 타입 검사
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크

### State Management & Data Fetching

- **Zustand** - 경량 상태 관리
- **TanStack Query** - 서버 상태 관리 및 데이터 페칭
- **React Hook Form** - 폼 상태 관리
- **Zod** - 스키마 검증

### UI Components

- **Radix UI(shadcn ui)** - 접근성 중심의 컴포넌트 라이브러리
- **Lucide React** - 아이콘 라이브러리
- **DND Kit** - 드래그 앤 드롭 기능

### Development Tools

- **ESLint & Prettier** - 코드 품질 및 포맷팅
- **Turbopack** - 빠른 개발 서버

## 📦 설치 및 실행

### 요구사항

- Node.js v22.17.0
- npm

### 설치

```bash
# 저장소 클론
git clone [repository-url]
cd aiortho2

# 의존성 설치
npm install
```

### 개발 환경 실행

```bash
# 개발 서버 시작 (Turbopack 사용)
npm run dev
```

개발 서버가 실행되면 http://localhost:3000 에서 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
aiortho2/
├── app/                    # Next.js App Router
│   ├── (protected)/        # 인증이 필요한 페이지
│   └── (public)/           # 인증이 불필요한 페이지
├── components/             # 공통 컴포넌트
├── constants/              # 공통 상수
├── hooks/                  # 공통 훅
├── lib/                    # 유틸리티 및 설정
├── models/                 # 공통 모델(스키마)
├── public/                 # 정적 파일
└── store/                  # 클라이언트 전역 상태 관리
```

## 🔧 개발 가이드라인

### 코드 품질

```bash
# 린트 검사
npm run lint

# 코드 포맷팅
npm run format
```

### 상태 관리

- 클라이언트 전역 상태: Zustand 사용
- 서버 상태: TanStack Query 사용
- 폼 상태: React Hook Form + Zod 사용

## 🔐 환경 변수

개발을 위해 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요.
