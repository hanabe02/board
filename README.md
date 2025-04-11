### board 게시판 프로젝트
    구현 기간 : 2025/09/00 ~ 진행중

 ## error 발생 CORS 오류 
    spring boot appication 실행 부분 상위로 폴더를 만들어서 controller 인식을 못해서 발생했던 문제 해결 완료 O
 ## error 발생 Spring boot : Mapper 인식을 못하는 문제 발생
    build.gradle 
        implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.2' (이전)
        implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.3' (변경)
         에서 버전을 3으로 변경해주니 오류가 해결이 되었다.
         오류 원인 분석해보니 .class 부분에서 loginMapper 부분을 인식을 못해서 오류가 났던것 같다.
        
