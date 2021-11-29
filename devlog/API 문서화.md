# 개발 고민
- 백엔드에서 전송하는 response 객체를 통일시켜 프론트 코드 작성 편의를 돕자
- response body
  - success
    - 정상 응답시 true, 오류시 false
  - response
    - 정상 응답시 응답 데이터 JSON 객체, 오류시 null
  - error
    - 정상 응답시 null, 오류시 {status: 4xx, message: "error message"}
    - 오류시에도 실제 응답 상태 200으로 보내고, front에선 error.status를 확인해 오류 상태를 감지한다. 안 그러면 axios에서 catch에 걸려버려 커스텀 api를 응답 받을 수 없게된다.

# API 문서화
- 스프링에 문서화 관련 라이브러리(Swagger, Spring Rest Docs, 등)이 있지만 우선 수작업으로 작성

## /users
## /posts
## /images
## /tokens