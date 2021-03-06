# Board project 기록
- 이번 프로젝트에서 익히고 싶은 것들
  - spring boot를 활용한 api backend 개발, 테스트 코드 작성
  - reactJS를 활용한 Web frontend 개발
  - AWS를 활용한 server 구축
  - Docker를 활용한 배포
  - 무중단 개발, 배포
  - git version 관리
  - 프로젝트 관련 기록 틈틈히

- 프로젝트 짧은 설명
  - 글을 쓸 수 있는 회원제 사이트
  - 댓글, 좋아요 등으로 등록된 글에 반응 할 수 있다

# 목차
[실행 화면](#실행-화면)

[버전 관리](#version-control)

[테이블 설계](#table-diagram)

[기술 스택](#skills)

[개발 기록](#devlog)


# 실행 화면

![실행 화면](./devlog/images/실행화면.gif)

# Version Control
![gitflow](./devlog/images/gitflow.PNG)

- main
  - 배포용 branch
  - develop에 있는 내용을 merge
  - hotfix, develop branch를 생성한다
- hotfix
  - 배포후 긴급 점검 branch
  - develop에 merge시킨 후 제거
- test 
  - feature에서 작성한 기능과 hotfix에서 수정한 기능에 대한 실험 branch
  - 배포환경과 논리적으론 똑같고 물리적으론 다른 환경에서 모의 배포를 해 테스트 해본다.
  - develop에 merge시킨 후 제거
- develop
  - 현재 개발 상황을 저장 중인 branch
  - feature, hotfix, test에 있는 내용을 merge
  - main에 merge시킨 후에도 branch를 제거하지 않고 유지한다
- feature
  - 기능 개발중인 branch
  - 완성후 develop에 merge시키고 제거

# Table Diagram
![table diagram](./devlog/images/ERdiagram.PNG)


# Skills
- Spring Boot
  - Web
  - lombock, commons-lang
  - JPA, MySQL, H2
  - Spring Security, JJWT, Validation
  - spring-cloud-aws
- ReactJS
  - react-router-dom
  - redux, react-redux, thunk
  - react-quill
- 통합/배포
  - git
  - Docker
- AWS
  - EC2(Ubuntu18.04)
  - RDS(MySQL), S3
  - Route53
  - Amplify

