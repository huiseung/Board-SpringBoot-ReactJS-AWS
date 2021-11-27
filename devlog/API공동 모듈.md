# 개발 고민
- 백엔드에서 전송하는 response 객체를 통일시켜 프론트 코드 작성 편의를 돕자
- response body
  - success
    - 정상 응답시 true, 오류시 false
  - response
    - 정상 응답시 응답 데이터 JSON 객체, 오류시 null
  - error
    - 정상 응답시 null, 오류시 {status: 4xx, message: "error message"}

# backend
- 개발 순서