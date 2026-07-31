# Interactive English Sessions

Zoom 화상 영어 수업을 위한 인터랙티브 학습 자료입니다. 한국 초등학생(8~12세)을 대상으로,
**Grammar · Vocabulary · Fun Speaking Activity** 중심으로 수업을 진행할 때 화면 공유로 함께
보고, 학생들이 직접 마우스/터치패드로 클릭하며 참여할 수 있도록 만들어졌습니다.

빌드 과정이 필요 없는 순수 HTML/CSS/JS 정적 사이트라, 링크만 공유하면 바로 사용할 수 있습니다.
발음은 브라우저 내장 음성합성(Web Speech API)을 사용하므로 별도 오디오 파일이 필요 없습니다.

## 사용 방법

1. GitHub Pages 링크(또는 로컬 서버 주소)를 학생에게 공유하거나 Zoom 화면 공유로 함께 봅니다.
2. 학생이 카드를 클릭해 뒤집고, 게임을 진행하고, 🔊 버튼으로 발음을 듣고 따라 말합니다.
3. 말하기 활동(Mystery Box, Interview 등)에서는 선생님이 실시간으로 대화를 이어갑니다.
4. 마무리 퀴즈에서 점수와 별을 확인하며 수업을 마무리합니다.

각 레슨은 한국어 설명과 영어 표현을 **동시에** 보여줘서, 원어민 선생님도 바로 "이게 무슨 뜻이야!"
하고 짚어줄 수 있게 설계했습니다.

## 로컬에서 미리보기

```bash
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

## 배포 (GitHub Pages)

`main` 브랜치에 push되면 `.github/workflows/deploy-pages.yml`이 자동으로 GitHub Pages에
배포합니다. 저장소 Settings → Pages → Source를 "GitHub Actions"로 설정해주세요.
배포 후에는 `https://<username>.github.io/<repo-name>/` 형태의 링크를 그대로 학생들과
공유하면 됩니다.

## 프로젝트 구조

```
index.html                     홈 페이지 — 유닛(수업) 목록
units/<unit-name>/index.html   개별 수업 페이지 (화면 흐름 마크업)
units/<unit-name>/lesson.js    해당 수업의 어휘/문법/퀴즈 데이터 + 화면 연결
assets/css/main.css            공통 디자인 시스템 (색상, 카드, 버튼, 애니메이션)
assets/js/speech.js            브라우저 TTS 발음 재생 헬퍼
assets/js/confetti.js          퀴즈 완료 시 색종이 효과
assets/js/activities.js        재사용 가능한 인터랙티브 액티비티 엔진
                                (플래시카드, 듣고 클릭하기, 객관식 퀴즈,
                                문장 만들기, Mystery Box, 인터뷰 카드)
assets/js/lesson-engine.js     화면 전환 / 진행률 바 / 스텝 네비게이션
```

## 현재 제공되는 유닛

- **Unit 1: My Family & My Feelings** (초등 저학년, 3-4학년)
  - Vocabulary: 가족 8단어, 감정 8단어
  - Grammar: `This is my ___.` / `He is / She is ___.` / `I am ___.`
  - Speaking: Mystery Family Box, Feelings Interview
  - 마무리 퀴즈 + 점수/별 리워드

## 새 유닛 추가하기

1. `units/<새-유닛-이름>/` 폴더를 만들고 `index.html`, `lesson.js`를 작성합니다.
   기존 `units/family-feelings/`를 템플릿으로 복사해서 시작하는 것을 추천합니다.
2. `lesson.js`에서 어휘/문법/퀴즈 데이터를 정의하고, `steps` 배열과
   `Activities.render*` 함수들을 이용해 화면을 구성합니다.
3. `index.html`(홈페이지)의 해당 레벨 섹션에 유닛 카드를 추가합니다.

## 커리큘럼 로드맵

- 🟠 초등 저학년 (3-4학년): 가족·감정 → 인사·자기소개 → 일상 루틴 → 색깔·숫자·동물
- 🔵 초등 고학년 (5-6학년): 날씨·계절 → 취미 → 과거형 → 길찾기/장소

2022 개정 교육과정(초등 영어)을 참고하여 주제와 문형을 구성합니다.
