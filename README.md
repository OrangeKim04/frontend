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
  
  *ex) [feat] 로그인 기능 구현*
  
    - `feat`: 새로운 기능 추가
    - `fix`: 버그 수정
    - `docs`: 문서 변경
    - `refactor`: 코드 리팩토링
    - `style`: 코드 스타일 수정
    - `test`: 테스트 추가/수정
 
-**feat브랜치 생성 및 이름 규칙**

1. project board에 add item
2. 클릭하여 convert to issue
3. assignees 지정(본인), labels 지정
4. create a branch -> feature 브랜치 만들기, 브랜치 source: develop
 * 브랜치 이름: feature/issue번호/기능이름
   *ex)feature/2/Navbar*

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
