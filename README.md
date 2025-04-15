### board 게시판 프로젝트
    구현 기간 : 2025/04/11 09:58 ~ 2025/04/15 10:04 총 걸린 시간(3일(토일 제외))

 ## error 발생 CORS 오류 
    spring boot appication 실행 부분 상위로 폴더를 만들어서 controller 인식을 못해서 발생했던 문제 해결 완료 O
    
    board_back/config/CorsConfig
    board_back/config/SecurityConfig
    board_back/config/WebConfig

    파일 추가
    
    
 ## error 발생 Spring boot : Mapper 인식을 못하는 문제 발생
    build.gradle 
        implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.2' (이전)
        implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.3' (변경)
         에서 버전을 3으로 변경해주니 오류가 해결이 되었다.
         오류 원인 분석해보니 .class 부분에서 loginMapper 부분을 인식을 못해서 오류가 났던것 같다.
         
## HTTP (400 error, 500 error) 발생
    400 : 앞단에서 보내는 요청 파라미터가 뒷단에서 기대하는 형식과 다른 경우 발생
    ex) get(쿼리 파리미터) -> @GetMapping, @RequestParameter
        post(body) -> @postMapping, @RequestBody

    500 : 뒷단 과정에서 error 가 발생한 경우 오류가 발생
    ex) 쿼리 error

### 추가 구현 기술

## 로그인 JWT 로그인 세션 

## CRUD 게시판 (추가, 조회, 수정, 삭제) 구현
