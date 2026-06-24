# Signal — 말하기 전에, 반응 가능성을 먼저 본다

> "오늘은 뭐가 궁금해서 나를 찾았어?"
> 편하게 말해줘. 고민도, 선택도, 궁금증도 함께 볼게.

---

## 🎯 앱 개요

**Signal**은 사용자가 고민이나 상황을 입력하면, 행동과학·설득 원리 기반으로 **확률 시그널**과 **리스크 시그널**을 분석해 최적의 다음 행동과 추천 문장을 제시하는 **범용 대화 코치 웹앱**입니다.

- **타깃**: 연애/관계/커리어/투자/가족 등 모든 삶의 고민이 있는 사람
- **포지셔닝**: 나만의 점쟁이 같은 직감형 어른 친구
- **컬러**: Deep Navy `#0F172A` + Mint `#6EE7D8`

---

## ✅ 현재 구현된 기능

### 홈 화면 (메인)
- 메인 카피: **"오늘은 뭐가 궁금해서 나를 찾았어?"**
- 서브 카피: **"편하게 말해줘. 고민도, 선택도, 궁금증도 함께 볼게."**
- 이름/닉네임 입력 ("어떻게 불러줄까?" 플레이스홀더)
- 성별 선택 (남/여/기타 버튼)
- 생년월일 선택 (년/월/일 드롭다운, 윤년 자동 처리)
- 고민 카테고리 12개 선택 (연애/결혼/성공/투자/공부/관계/커리어/돈/건강/가족/미래/마음)
- 카테고리별 빠른 질문 칩 (자동 변경)
- 자유 텍스트 입력창 (500자, 글자 수 카운트, Ctrl+Enter 단축키)
- 파티클 배경 애니메이션 (민트 연결선)

### 대화 채팅 화면 (v4 엔진 — 최신)
- **점쟁이 페르소나 헤더**: `🔮 [이름] · [직함] [경력]년 / 너의 운의 시그널을 보면,`
- **카테고리별 30년+ 전문 점쟁이**: 재운 도사 / 명경 보살 / 청아 보살 / 천기 도사 등
- **대화 히스토리 저장 + 이어가기**: 기록 탭에서 재열람, 이전 맥락 인식
- **v4 Chat Reply Engine**: `want × topic` 2차원 의도 파싱

### 분석 결과 화면
- 개인화 배지 (나이대 · 성별 · 카테고리 · 이름 기반)
- **오늘의 한마디** — 이름 호출 포함 직관적 한 줄 해석
- **확률 시그널** — 수용 가능성 (민트 막대, 숫자 애니메이션)
- **리스크 시그널** — 관계 손상 위험 (코랄 막대, 숫자 애니메이션)
- **흐름 해석** — 카테고리별 맞춤 해석 문구
- **다음 한 수** — 실행 가능한 행동 3가지
- **이렇게 말해봐** — 추천 문장 3개 (탭하면 클립보드 복사)
- **이건 피해봐** — 역효과 경고 문구
- **✦ 황금 타로 공유 카드** (신규) — 결과를 금박 타로 카드로 시각화 + PNG 저장 + 공유
- 저장하기 / 새 질문 버튼

### ✦ 황금 타로 공유 카드 (Gold Signal Share Card) — 신규
- **THE FOOL 금박 타로 카드 스타일** 디자인
  - 황금 metallic gradient 배경 (radial + linear 조합)
  - 방사형 Sunburst 패턴 (`repeating-conic-gradient`)
  - 이중 아치형 외곽 프레임 + 코너 다이아몬드 장식
  - 상단 기하학 장식 (아치 + 트리플 다이아몬드)
  - 하단 붉은 리본 배너 (카테고리별 카드 이름: THE SIGNAL, THE LOVE 등)
  - Slab Serif 폰트 (Georgia)
- **3D Tilt & Shine 효과** — 마우스/터치 방향으로 카드 기울기 + 반사 빛 이동
- **카드 내용 자동 채움** — 카테고리 이모지 + 가능성% + 요약 문장 + 리스크 배지
- **PNG 저장** — `html2canvas` 3배 고해상도 캡처 → 로컬 다운로드
- **공유하기** — Web Share API (모바일 네이티브 공유) + 클립보드 fallback
- ESC 키 / 오버레이 클릭으로 닫기

### 로딩 화면
- 이름 기반 개인화 문구
- 스캔 링 3중 애니메이션 + 민트 중심 점

### 기록 화면
- 최대 50개 저장
- 카테고리 배지 + 날짜 + 확률/리스크 수치 표시
- 카드 탭 시 결과 재열람

### 설정 화면
- 프로필 표시 (아바타 + 이름 + 나이대/성별/카테고리)
- Signal Plus 프리미엄 카드 (월간 ₩9,900 / 연간 ₩59,000)
- 개인정보 처리방침 모달
- 이용약관 모달
- AI 한계 안내 모달 (위기 상담 전화 포함)
- 데이터 초기화

### 기타
- Toast 알림
- 바텀 시트 모달
- 로컬스토리지 자동 저장 (프로필, 기록)
- 모바일 완전 반응형
- 콘솔 에러 없음

---

## 📁 파일 구조

```
index.html          메인 HTML (홈/로딩/결과/기록/설정 화면 포함)
css/
  style.css         전체 스타일 (Deep Navy + Mint, 반응형, 애니메이션)
js/
  app.js            앱 로직 (신호 계산, 화면 전환, 기록, 파티클, LLM 호출)
api/
  chat.js           Vercel Serverless Function (OpenAI API Key 중계)
vercel.json         Vercel 배포 라우팅 설정
README.md
```

---

## 🤖 LLM 연결 구조 (파트 B)

### 아키텍처

```
브라우저 (Signal 앱)
    │  POST /api/chat  { message, history, category, cardReading }
    ▼
Vercel Serverless Function  (api/chat.js)
    │  OPENAI_API_KEY (환경변수, 클라이언트에 노출 안 됨)
    ▼
OpenAI API  (gpt-4o-mini)
    │  reply 텍스트 반환
    ▼
브라우저 — 채팅창에 출력
```

### Vercel 배포 후 환경변수 설정 방법

1. [Vercel Dashboard](https://vercel.com) → 프로젝트 선택
2. **Settings → Environment Variables**
3. 아래 변수 추가:

| 이름 | 값 | 적용 환경 |
|------|----|----------|
| `OPENAI_API_KEY` | `sk-...` (발급받은 키) | Production, Preview |

### LLM 동작 방식

- **정상**: `LLM_ENABLED = true` → Vercel Function 호출 → GPT-4o-mini 답변
- **오류/오프라인**: 자동으로 로컬 v4 엔진(want×topic 룰 기반)으로 fallback
- **카테고리 그룹 매핑**:
  - `love` 그룹: 연애, 결혼, 이혼, 가족, 친구, 관계
  - `money` 그룹: 돈, 투자, 부동산, 빚, 창업, 법률
  - `work` 그룹: 커리어, 공부, 성공, 미래
  - `health` 그룹: 건강, 마음, 트라우마

---

## 🔗 주요 URI / 흐름

| 화면 | 트리거 | 함수 |
|------|--------|------|
| 홈 | 기본 진입 | `showScreen('home')` |
| 로딩 | "흐름 읽어보기" 버튼 | `startAnalysis()` |
| 결과 | 분석 완료 | `showScreen('result')` |
| 기록 | 내비 시계 아이콘 | `showScreen('history')` |
| 설정 | 내비 설정 아이콘 | `showScreen('settings')` |

---

## 🧠 시그널 계산 로직

```
accept = 40 + random(35) + 카테고리 바이어스 + 질문 키워드 보정 + 나이 보정
risk   = 20 + random(30) + 리스크 키워드 보정 + (80 - accept) / 5

accept 범위: 15 ~ 88%
risk   범위: 8  ~ 80%
```

**활용 기반 원리**
- Mere-Exposure Effect (친밀함 효과)
- Cialdini 7 Principles of Persuasion
- Commitment & Consistency (NN/g)
- Therapeutic Alliance (PMC9840508)

---

## 💰 수익화 계획

| 플랜 | 가격 | 주요 기능 |
|------|------|-----------|
| 무료 | 0원 | 기본 분석, 기록 10개 |
| Signal Plus 월간 | ₩9,900/월 | 무제한 분석, 기록, 심화 해석 |
| Signal Plus 연간 | ₩59,000/년 | 월간 대비 50% 절약 |

---

## 🔜 미구현 / 추천 다음 단계

### 황금 카드 — 추가 개선
- [ ] 오라클 카드 SVG를 황금 스타일로 리디자인 (기존 흑백 → 금박)
- [ ] 카드 뒷면 디자인 (패턴 + Signal 로고)
- [ ] 애니메이션 GIF 공유 (카드 3D 회전)
- [ ] 모바일 haptic feedback (진동)

### 이후 단계
- [ ] 실제 회원가입/로그인 (소셜 로그인)
- [ ] 백엔드 API 연동 (기록 서버 저장)
- [ ] 실제 결제 모듈 연동 (인앱 결제)
- [ ] Google Analytics + Vercel Analytics 연동
- [ ] Supabase 데이터 저장 (질문/결과/채팅)
- [ ] 카테고리별 분석 고도화 (연애 / 투자 / 커리어 특화)
- [ ] 데일리 시그널 기능
- [ ] Signal Score 게임화
- [x] 피드백 버튼 (👍👎) ✅ v1.4.0
- [x] Google Analytics 연동 ✅ v1.5.0
- [x] Supabase 데이터 저장 ✅ v1.5.0
- [x] Signal Memory — 인생 기억 엔진 ✅ v1.6.0
- [ ] Signal Memory — 서버 동기화 (현재 로컬스토리지)
- [ ] 영어 버전 글로벌 확장
- [ ] 주간 패턴 리포트
- [ ] 지난 흐름 비교 분석
- [ ] 알림 (리마인더)
- [ ] 음성 입력 / 음성 답변
- [ ] PWA (모바일 앱처럼 설치 가능)
- [ ] v4 채팅 엔진 확장: 더 많은 want×topic 조합 커버리지
- [ ] gpt-4o로 모델 업그레이드 (더 풍부한 답변)

---

## 🛡️ 안전 원칙

Signal은 다음 용도의 사용을 엄격히 금지합니다:
- 스토킹, 강압, 조종 목적
- 미성년자 대상 연애 유도
- 타인에게 해를 끼치는 목적

정신건강 위기 시 → **1393** (자살예방상담전화) / **1577-0199** (정신건강 위기상담) — 24시간 운영

---

## 📋 파일 수정 이력

### v1.6.0 — Signal Memory (인생 기억 엔진)

| 파일 | 변경 내용 |
|------|-----------|
| `index.html` | 메모리 탭 버튼 추가 (하단 5번째), `screen-memory` 화면 추가 (AI 코멘트 / 감정 변화 / 반복 패턴 / 타임라인 / 통계) |
| `css/style.css` | Signal Memory 전체 스타일 추가 (memory-container, emotion-card, pattern-item, timeline, stats-row 등) |
| `js/app.js` | `saveMemoryEntry()`, `renderMemoryScreen()`, `getMemoryContext()`, `showMemoryRecallIfNeeded()` 등 Memory 엔진 추가. 분석 시 자동 저장, 채팅 시 Memory 배너 표시 |

**Memory 저장 구조 (localStorage `signal_memory_v1`)**

```json
{
  "id": "1719000000000",
  "created_at": 1719000000000,
  "category": "invest",
  "question": "지금 투자해도 될까?",
  "accept": 67,
  "risk": 31,
  "emotion": { "anxiety": 42, "confidence": 58, "hope": 63, "action": 71 },
  "keywords": ["투자"],
  "decision_type": "invest"
}
```

---

### v1.5.0 — 분석/피드백 데이터 저장 (GA4 + Supabase)

| 파일 | 변경 내용 |
|------|-----------|
| `index.html` | Google Analytics GA4 (`G-KB3ZK152Z9`) 스크립트 삽입. `gtag()` 초기화 |
| `js/app.js` | Supabase REST API 헬퍼 `_sbInsert()` 추가. `startAnalysis()` 시 `signal_results` 테이블 저장. `submitFeedback()` 시 `signal_feedback` 테이블 저장. GA 이벤트 6종 추가 (`analysis_start`, `result_view`, `gold_card_open`, `card_save`, `card_share`, `feedback_submit`) |

**Supabase 테이블 구조**

| 테이블 | 필드 |
|--------|--------|
| `signal_results` | id, created_at, category, accept, risk, summary, user_age, user_gender |
| `signal_feedback` | id, created_at, category, accept, risk, feedback_type |

---

### v1.4.0 — 기반 다지기 (피드백 · 모바일 개선 · 링크 공유)

| 파일 | 변경 내용 |
|------|-----------|
| `js/app.js` | `copyShareLink()` 링크 복사 함수, `submitFeedback(type)` 피드백 저장 함수, `_resetFeedbackBlock()` 초기화 함수 추가. `renderResult()` 내에서 `_resetFeedbackBlock()` 자동 호출 연결. 골드 팔레트 `GC_G='#C8973A'`(참조이미지 톤)으로 조정 |
| `index.html` | 피드백 블록 (`feedbackBlock`, `fbHelp`, `fbNope`, `feedbackDone`) + 골드카드 모달 링크 복사 버튼 (`gcCopyBtn`) 추가. 골드카드 액션 버튼 3개 (저장/공유/링크) |
| `css/style.css` | 피드백 블록 스타일 (`.feedback-block`, `.feedback-btn`, `.feedback-btn.selected`, `@keyframes fbDoneIn`). 모바일 개선: `safe-area-inset`, 터치 타겟 44px+, 퀵칩 horizontal scroll, iOS 자동줌 방지(`font-size:15px`), `.gc-action-btn.copied` 상태 스타일 |
| `gold-card-preview.html` | DOM API 방식 v4 완전 재작성. 4종 순수 기하학 심볼 (cosmic_eye / triple_moon / sun_waves / sunburst), 4종 프레임, 3D 틸트, 갤러리 4장 |

**새 함수 목록 (v1.4.0)**
- `copyShareLink()` — 결과 텍스트 + URL 클립보드 복사, gcCopyBtn 2.2초 상태 전환
- `submitFeedback('helpful'|'not_helpful')` — 버튼 선택 표시 → 0.5초 후 완료 메시지, localStorage `signal_feedback` 최근 50개 저장
- `_resetFeedbackBlock()` — 새 결과 진입마다 피드백 블록 초기 상태 복원 (renderResult 내 호출)

**황금 카드 4종 심볼 시스템 (v1.3.0→v1.4.0 공통)**

| 심볼 키 | 연결 카테고리 | 특징 |
|---------|---------------|------|
| `cosmic_eye` | love, family, relation, legal, trauma | 아몬드 형태 눈 + 방사형 태양광선 |
| `triple_moon` | marriage, divorce, friend, debt, health, mind | 세로 3달 위상 + 대형 코너 별 |
| `sun_waves` | career, startup, study, future | Q베지어 물결 광선 + 수평 달 시퀀스 |
| `sunburst` | money, invest, realestate, success | 직선 방사광선 + 좌우 초승달 |

---

### v1.3.0 — 황금 카드 퀄리티 재구성 (v3)

| 파일 | 변경 내용 |
|------|-----------|
| `js/app.js` | 골드카드 SVG 시스템 v3 전면 재설계. 팔레트 `#D4A94A` 계열, `_gcOrbitMoons()` 추가, `_gcSymTripleMoonSun()` 9레이어 재구성, `_gcOuterFrame()` 단순화, `_gcBuildCardText()` 신규, `gcBuildSvgCard()` 이중 그라데이션 + 비네트 |
| `gold-card-preview.html` | DOM API 방식으로 완전 재작성. 3D 틸트 효과, 소형 갤러리 3장, 시드 기반 별 배경 |

### v1.2.0 — 검정+금 라인아트 타로 카드

| 파일 | 변경 내용 |
|------|-----------|
| `index.html` | 황금 카드 모달: 아르누보 SVG 천사 일러스트 전체 제거 → `<svg id="goldCardSvg">` 단일 엘리먼트로 교체. openGoldCard() 시 requestAnimationFrame으로 크기 계산 후 SVG 주입 |
| `css/style.css` | `.gc-bg`, `.gc-sunburst`, `.gc-frame-outer/inner`, `.gc-top-deco`, `.gc-content`, `.gc-illustration`, `.gc-ribbon`, `.gc-corner` 등 구 CSS 클래스 제거. `.gold-signal-card` 배경색 `#0d0d0d`로 변경, `border-radius:12px`로 조정. `#goldCardSvg` 절대 위치 fill 스타일 추가 |
| `js/app.js` | `_buildShareCard()` → JS 프로시저럴 SVG 생성 시스템으로 전면 교체. SVG 생성 함수: `gcBuildSvgCard()`, `_gcOuterFrame()`, `_gcStarsBg()`, `_gcSunRays()`, `_gcDotCircle()`, 심볼 7종(`_gcSymbolSunEye/MoonFace/SunRays/ArchEye/MoonPhases/SunMoon/EyeRays`), `_gcGetSymbol()`, `_gcSplitSummaryForSvg()`. 카테고리별 symbol 키 추가 (`_gcCatMeta()`). `openGoldCard()` rAF 2프레임 딜레이 추가 |
| `gold-card-preview.html` | 검정+금 라인아트 독립 미리보기 페이지 (신규 생성, v2) — 동일 JS SVG 시스템, 카테고리 칩 + 슬라이더 + 6장 갤러리 |

### v1.1.0 — 황금 타로 공유 카드 (초기)

| 파일 | 변경 내용 |
|------|-----------|
| `css/style.css` | 황금 타로 카드 CSS 전체 추가 (400+ lines) |
| `index.html` | html2canvas CDN, `share-card-btn`, `goldCardOverlay` 모달 HTML |
| `js/app.js` | `openGoldCard()`, `saveCardAsImage()`, `shareCard()`, `gcTilt()` 등 함수 추가 |

---

### 🎴 황금 카드 스타일 — v3 퀄리티 재구성

| 속성 | 값 |
|------|-----|
| 배경 | 이중 방사형 그라데이션 (`#1e1b0e` → `#070604`) + 중앙 골드 글로우 레이어 + 비네트 |
| 골드 팔레트 | `#D4A94A` (핵심) · `#EDD17E` (하이라이트) · `#9A7028` (섀도우) · `#F5E4A0` (포인트) |
| 폰트 | Georgia serif (SVG 내장) |
| 심볼 종류 | triple_moon_sun / moon_face / sun_rays / arch_eye / moon_phases / eye_rays / sun_eye |
| 9레이어 구조 | 배경방사선→점선동심원→보조광선16→주광선16→페탈→궤도달×8→태양→얼굴→상단초승달→좌우초승달→눈 |
| 궤도 달 위상 | 보름/상현/초승달/그믐/신월 × 8개 원형 배치 |
| 카드 비율 | 5:8 (세로형 타로) |
| 텍스트 레이어 | SIGNAL 타이틀 · 카테고리 · ACCEPT/RISK 수치 · ORACLE·GOLD 하단 |
| 저장 해상도 | html2canvas scale=3 (3배 고해상도 PNG) |

*Signal v1.5.0 · 이 앱의 결과는 참고용이며 전문적인 조언을 대체하지 않습니다.*
