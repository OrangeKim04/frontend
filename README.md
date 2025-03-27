# 제로픽 Frontend

---

## 🛠️ 기술 스택

- **Frontend**:
  - React.js
  - TypeScript
  - Vite
  - Styled-components

    
- **Linting & Formatting**:
  - ESLint
  - Prettier
  - husky(commitLint)
    
- **Package Manager**:
  - Yarn

---

## :two_men_holding_hands:팀원 소개
| 김규리 | 임용진 | 
|:-----:|:------:|
|팀원/FE|팀원/FE|

---

## :ok_woman:협업 규칙
- Issue로부터 feature 브랜치 만들기, 그 브랜치에서 각자 작업(branch source: develop)
- 서로 다른 파일에서 작업
- 항상 작업 시작 전 최신 develop반영
- commit, merge, pull 자주하기
- 열심히 잘 하기
- 연락 최대한 빨리 보기
  
-**커밋 메시지 규칙: [태그]설명**
  
  *ex) feat: initial commit*
  
    - ci: CI 설정/스크립트 변경
    - chore: 기타 작업 (빌드, 패키지 관리 등)
    - docs: 문서 변경
    - ticket: 이슈/티켓 관련 작업
    - feat: 새로운 기능 추가
    - fix: 버그 수정
    - perf: 성능 개선
    - refactor: 코드 리팩토링
    - revert: 변경사항 되돌리기
    - style: 코드 스타일 수정
 
-**feat브랜치 생성 및 이름 규칙**

create a branch -> feature 브랜치 만들기, 브랜치 source: develop
 * 브랜치 이름: feature/기능이름
   *ex)feature/Navbar*

---
## ➡️ 깃 브랜치 전략 
깃 플로우(gitflow)

- main : 기준이 되는 브랜치로 제품을 배포하는 브랜치
- develop : 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 Merge
- feature : 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 Merge

과정
- master 브랜치에서 develop 브랜치를 분기합니다.
- 개발자들은 develop 브랜치에 자유롭게 커밋을 합니다.
- 기능 구현이 있는 경우 develop 브랜치에서 feature-* 브랜치를 분기합니다.
- 테스트가 완료되면 develop 브랜치를 main에 merge합니다.

---
