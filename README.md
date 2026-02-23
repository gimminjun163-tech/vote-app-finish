# Vote - 실시간 투표 애플리케이션

깔끔하고 부드러운 디자인의 실시간 투표 웹 애플리케이션입니다.

## 주요 기능

- 🔐 **로그인/회원가입**: 간편한 계정 관리
- 📊 **투표 참여**: 다양한 투표에 참여하고 결과 확인
- ✨ **투표 만들기**: 나만의 투표 생성
- 📈 **실시간 통계**: 원 그래프와 막대 그래프로 결과 시각화
- 🔍 **검색 및 필터**: 투표 검색, 정렬, 필터링
- 👤 **프로필 관리**: 내가 만든 투표 관리
- 👥 **생성자 표시**: 투표 카드에 생성자 이름 표시
- 💾 **영구 저장**: Vercel KV (Redis)로 데이터 영구 보관

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Storage**: Vercel KV (Redis)
- **Database**: @vercel/kv

## 설치 및 실행

### 로컬 개발 환경

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

**⚠️ 주의**: 로컬에서 실행하려면 Vercel KV 환경 변수가 필요합니다. 자세한 내용은 [VERCEL_KV_SETUP.md](./VERCEL_KV_SETUP.md)를 참고하세요.

### Vercel 배포

1. GitHub에 리포지토리 생성 및 코드 푸시
2. [Vercel](https://vercel.com)에 로그인
3. "New Project" 클릭
4. GitHub 리포지토리 선택
5. "Deploy" 클릭
6. **Vercel KV 설정** (중요!):
   - Storage 탭에서 KV 데이터베이스 생성
   - 프로젝트에 연결
   - 재배포

자세한 설정 방법은 **[VERCEL_KV_SETUP.md](./VERCEL_KV_SETUP.md)**를 참고하세요!

## 사용 방법

### 1. 회원가입/로그인
- 앱 실행 시 로그인 화면이 표시됩니다
- 계정이 없다면 "회원가입"을 클릭하여 계정을 만드세요

### 2. 투표 참여
- "투표들" 탭에서 모든 투표를 확인할 수 있습니다
- 검색, 정렬, 필터를 활용하여 원하는 투표를 찾으세요
- 투표 카드를 클릭하여 참여하고 결과를 확인하세요

### 3. 투표 만들기
- "투표 만들기" 탭에서 새 투표를 생성할 수 있습니다
- 질문, 선택지, 선택 방식, 마감일 등을 설정하세요
- 기타 선택지도 추가할 수 있습니다

### 4. 프로필 관리
- 오른쪽 상단의 프로필 아이콘을 클릭하세요
- 가입 정보와 내가 만든 투표들을 확인할 수 있습니다

## 프로젝트 구조

```
vote-app/
├── app/
│   ├── api/                  # API Routes
│   │   ├── users/           # 사용자 관련 API
│   │   └── votes/           # 투표 관련 API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Auth.tsx             # 로그인/회원가입
│   ├── CreateVote.tsx       # 투표 만들기
│   ├── Navbar.tsx           # 네비게이션 바
│   ├── Profile.tsx          # 프로필
│   ├── VoteCard.tsx         # 투표 카드
│   ├── VoteDetail.tsx       # 투표 상세/통계
│   └── VotesList.tsx        # 투표 목록
├── lib/
│   ├── server-store.ts      # 서버 저장소 (Vercel KV)
│   └── store.ts             # 클라이언트 저장소
├── VERCEL_KV_SETUP.md       # Vercel KV 설정 가이드
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 디자인 특징

- **색상**: 회색(기본) + 파랑, 보라, 노랑 그라디언트
- **스타일**: 부드럽고 깔끔한 모던 디자인
- **반응형**: 모바일, 태블릿, 데스크톱 모두 지원

## 데이터 저장

이 앱은 **Vercel KV (Redis)**를 사용하여 데이터를 영구 저장합니다:

- ✅ 모든 사용자가 같은 데이터 공유
- ✅ 다른 브라우저/컴퓨터에서 동일 데이터 접근
- ✅ 서버 재시작해도 데이터 유지

설정 방법은 [VERCEL_KV_SETUP.md](./VERCEL_KV_SETUP.md)를 참고하세요.

## 라이선스

MIT License
