# Vercel KV 데이터베이스 추가 가이드

## 🎯 Vercel KV란?

Vercel KV는 Redis 기반의 무료 데이터베이스 서비스입니다.
- ✅ 빠른 성능 (Redis 기반)
- ✅ 간단한 설정
- ✅ 무료 플랜: 256MB, 30,000 commands/월

## 📋 단계별 설정 방법

### 1단계: GitHub에 코드 푸시

```bash
# Git 초기화 및 푸시
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/gimminjun163-tech/vote-app-finish.git
git push -u origin main
```

### 2단계: Vercel에 프로젝트 배포

1. **Vercel 접속** - https://vercel.com
2. **로그인** (GitHub 계정으로)
3. **New Project** 클릭
4. **GitHub 리포지토리 선택** (`vote-app-finish`)
5. **Deploy** 클릭

⏳ 첫 배포가 완료될 때까지 기다립니다 (2-3분)

### 3단계: Vercel KV 데이터베이스 생성

#### 3-1. Storage 탭으로 이동

1. Vercel Dashboard에서 프로젝트 선택
2. 상단 메뉴에서 **Storage** 탭 클릭

#### 3-2. KV 데이터베이스 생성

1. **Create Database** 버튼 클릭
2. **KV (Redis)** 선택
3. 데이터베이스 이름 입력:
   ```
   vote-app-db
   ```
4. **Region** 선택 (가까운 지역 선택, 예: Singapore)
5. **Create** 버튼 클릭

✅ 데이터베이스가 생성되었습니다!

### 4단계: 프로젝트에 데이터베이스 연결

#### 4-1. Connect Project 클릭

생성된 KV 데이터베이스 페이지에서:

1. **Connect Project** 버튼 클릭
2. 배포한 프로젝트 선택 (`vote-app-finish`)
3. **Connect** 버튼 클릭

✅ 환경 변수가 자동으로 추가됩니다:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_URL`

#### 4-2. 재배포 (중요!)

환경 변수가 추가되었으므로 **반드시 재배포**해야 합니다:

**방법 1: Vercel Dashboard에서**
1. **Deployments** 탭으로 이동
2. 최신 배포 옆의 **...** (점 3개) 메뉴 클릭
3. **Redeploy** 클릭
4. **Redeploy** 확인

**방법 2: Git 커밋으로**
```bash
git commit --allow-empty -m "Trigger redeploy for KV"
git push
```

⏳ 재배포가 완료될 때까지 기다립니다 (1-2분)

### 5단계: 확인

1. 배포된 사이트 접속
2. 회원가입/로그인 테스트
3. 투표 생성 테스트
4. 게시글 작성 테스트
5. 다른 브라우저에서 같은 데이터가 보이는지 확인!

## 🔍 데이터 확인하기

Vercel KV Dashboard에서 저장된 데이터를 확인할 수 있습니다:

1. Storage → 생성한 KV 데이터베이스 클릭
2. **Data Browser** 탭 클릭
3. 저장된 키 확인:
   - `vote_app:users` - 모든 사용자
   - `vote_app:votes` - 모든 투표
   - `vote_app:posts` - 모든 게시글

## 💻 로컬 개발 환경 설정 (선택사항)

로컬에서도 Vercel KV를 사용하려면:

### 1. 환경 변수 복사

1. Vercel Dashboard → Storage → KV 데이터베이스
2. **`.env.local` 탭** 클릭
3. 환경 변수 전체 복사

### 2. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 만들고 붙여넣기:

```env
KV_REST_API_URL="https://your-kv-url.upstash.io"
KV_REST_API_TOKEN="your-token-here"
KV_REST_API_READ_ONLY_TOKEN="your-read-only-token"
KV_URL="redis://default:password@your-redis-url.upstash.io:6379"
```

### 3. 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속!

## ⚠️ 문제 해결

### "Failed to register/login" 에러

1. **환경 변수 확인**:
   - Vercel Dashboard → Settings → Environment Variables
   - KV 환경 변수가 있는지 확인

2. **재배포 확인**:
   - 환경 변수 추가 후 반드시 재배포 필요
   - Deployments → Redeploy

3. **KV 연결 확인**:
   - Storage → KV 데이터베이스
   - Connected Projects에 프로젝트가 있는지 확인

### 로컬에서 "Cannot connect to KV" 에러

1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 값이 정확한지 확인
3. 개발 서버 재시작 (`npm run dev`)

### 데이터가 사라졌어요

- 무료 플랜은 30일간 미사용 시 데이터가 삭제될 수 있습니다
- 중요한 데이터는 백업을 권장합니다

## 📊 무료 플랜 제한

- **저장소**: 256MB
- **Commands**: 30,000/월
- **대역폭**: 200MB/일
- **동시 연결**: 50개

작은 투표 앱에는 충분합니다!

## 🚀 완료!

이제 모든 사용자가 같은 데이터를 공유합니다:
- ✅ 투표 데이터
- ✅ 게시글 및 댓글
- ✅ 사용자 정보

영구적으로 저장되며, 서버가 재시작되어도 데이터가 유지됩니다! 🎉
