# Vue 프론트엔드 프로젝트 - 생성된 파일 목록

## 📦 프로젝트 구조

총 **40개 이상의 파일**이 생성되었습니다.

### 1. 루트 설정 파일 (7개)
```
✅ package.json              - npm 의존성 관리
✅ vite.config.ts            - Vite 빌드 설정
✅ tsconfig.json             - TypeScript 설정
✅ tsconfig.node.json        - Node용 TypeScript 설정
✅ .env                      - 환경 변수
✅ .gitignore                - Git 제외 파일
✅ README.md                 - 프로젝트 문서
✅ index.html                - HTML 진입점
```

### 2. src/ - 핵심 파일 (2개)
```
✅ src/main.ts               - 앱 진입점
✅ src/App.vue               - 루트 컴포넌트
```

### 3. src/router/ - 라우팅 (3개)
```
✅ src/router/index.ts       - 라우터 설정
✅ src/router/routes.ts      - 라우트 정의
✅ src/router/guards.ts      - 네비게이션 가드
```

### 4. src/api/ - API 클라이언트 (4개)
```
✅ src/api/index.ts          - Axios 인스턴스 설정
✅ src/api/robotApi.ts       - 로봇 API
✅ src/api/authApi.ts        - 인증 API
✅ src/api/dashboardApi.ts   - 대시보드 API
```

### 5. src/types/ - TypeScript 타입 (6개)
```
✅ src/types/index.ts        - 타입 진입점
✅ src/types/robot.ts        - 로봇 관련 타입
✅ src/types/user.ts         - 사용자 타입
✅ src/types/sensor.ts       - 센서 타입
✅ src/types/websocket.ts    - WebSocket 타입
✅ src/types/common.ts       - 공통 타입
```

### 6. src/stores/ - Pinia Store (3개)
```
✅ src/stores/authStore.ts       - 인증 Store
✅ src/stores/robotStore.ts      - 로봇 Store
✅ src/stores/websocketStore.ts  - WebSocket Store
```

### 7. src/plugins/ - 플러그인 (1개)
```
✅ src/plugins/vuetify.ts    - Vuetify 설정
```

### 8. src/layouts/ - 레이아웃 (2개)
```
✅ src/layouts/DefaultLayout.vue  - 기본 레이아웃
✅ src/layouts/AuthLayout.vue     - 인증 레이아웃
```

### 9. src/components/ - 컴포넌트 (1개)
```
✅ src/components/common/AppHeader.vue  - 헤더 컴포넌트
```

### 10. src/views/ - 페이지 (7개)
```
✅ src/views/Login.vue                 - 로그인 페이지
✅ src/views/Dashboard.vue             - 대시보드 페이지
✅ src/views/RobotControl.vue          - 로봇 제어 페이지
✅ src/views/MapView.vue               - 맵 뷰 페이지
✅ src/views/EquipmentManagement.vue   - 장비 관리 페이지
✅ src/views/MonitoringLogs.vue        - 모니터링 페이지
✅ src/views/Settings.vue              - 설정 페이지
✅ src/views/NotFound.vue              - 404 페이지
```

### 11. src/assets/styles/ - 스타일 (2개)
```
✅ src/assets/styles/main.scss      - 메인 스타일
✅ src/assets/styles/variables.scss - SCSS 변수
```

---

## 🚀 사용 방법

### 1. 압축 해제
```bash
# frontend-vue-project.tar.gz 파일을 다운로드 받은 후
tar -xzf frontend-vue-project.tar.gz
cd frontend-vue-project
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

---

## 📝 주요 기능

### ✅ 완전히 구현된 기능
1. **인증 시스템**
   - 로그인 페이지
   - JWT 토큰 관리
   - 로그아웃
   - 라우트 가드

2. **대시보드**
   - 로봇 상태 요약 카드
   - 실시간 로봇 상태 테이블
   - 배터리 상태 표시
   - WebSocket 연결

3. **로봇 제어**
   - 로봇 목록 표시
   - 로봇 선택
   - 방향키 제어 UI
   - 속도 슬라이더
   - 긴급 정지 버튼

4. **상태 관리 (Pinia)**
   - authStore - 인증 상태
   - robotStore - 로봇 데이터
   - websocketStore - 실시간 통신

5. **API 통신**
   - Axios 설정
   - 인터셉터 (토큰 자동 추가)
   - 에러 핸들링

### 🔄 구현 예정 기능
- MapView 상세 구현
- EquipmentManagement CRUD
- MonitoringLogs 실시간 로그
- Settings 페이지
- 추가 컴포넌트들

---

## 🎨 UI 프레임워크

- **Vuetify 3** - Material Design 컴포넌트
- **Material Design Icons** - 아이콘
- **반응형 디자인** - 모바일/태블릿/데스크톱

---

## 🔧 기술 스택

- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia (상태 관리)
- Vue Router
- Vuetify 3
- Axios
- STOMP.js (WebSocket)

---

## 📂 다음 단계

1. **백엔드 연동**
   - Spring Boot 서버 실행
   - API 엔드포인트 연결 확인

2. **추가 컴포넌트 개발**
   - 센서 시각화 컴포넌트
   - 맵 캔버스 컴포넌트
   - 차트 컴포넌트

3. **WebSocket 구현**
   - 실시간 로봇 위치 업데이트
   - 센서 데이터 스트리밍
   - 로그 스트리밍

4. **테스트 작성**
   - Unit 테스트
   - Integration 테스트

---

## 💡 참고 사항

### 환경 변수 설정
`.env` 파일에서 백엔드 URL을 수정하세요:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws
```

### 로그인 테스트
기본 테스트 계정 (백엔드에서 설정):
- Username: admin
- Password: admin123

---

**생성일**: 2026-02-05  
**생성자**: Claude (Anthropic AI)  
**프로젝트**: Robot Control System - Frontend Vue Project
