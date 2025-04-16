### board 게시판 프로젝트
    구현 기간 : 2025/04/11 09:58 ~ 2025/04/15 10:04 총 걸린 시간(3일(토일 제외))
        + 게시판 CLUD
        + AOP
        + JWT 토큰 로그인
        + redux-saga
    
    + 페이징 기법 구현 : 2025/04/15 ~ 2025/04/16 총 걸린 시간 (10시간)

 ## error 발생 CORS 오류 
    spring boot appication 실행 부분 상위로 폴더를 만들어서 controller 인식을 못해서 발생했던 문제 해결 완료 O
    
    board_back/config/CorsConfig
    board_back/config/SecurityConfig
    board_back/config/WebConfig

    파일 추가

## error 발생 f5 새로고침시 store 에 저장되어 있는 토큰 정보가 초기화 되어서 login 을 다시 애햐하는 문제 발생
    react 기본 동작 때문에 오류가 발생한 것이었다. 오류 해결 O

    const [checkedLogin, setCheckedLogin] = useState(false); 코드 추가
    if (!checkedLogin) return <div>로딩 중...</div>; 코드 추가
    
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
    로그인 JWT, CRUD 게시판, AOP, 페이징 기법

## 로그인, 로그아웃 JWT 로그인 세션 
    package com.example.board_back.jwt;

    import io.jsonwebtoken.Jwts;
    import io.jsonwebtoken.SignatureAlgorithm;
    import io.jsonwebtoken.security.Keys;
    import org.springframework.stereotype.Component;
    
    import java.security.Key;
    import java.util.Date;
    
    @Component
    public class JwtUtil {
        private final Key key = Keys.hmacShaKeyFor("mySecretKeymySecretKeymySecretKeymySecretKey".getBytes());
        private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간
    
        public String generateToken(String userId) {
            return Jwts.builder()
                    .setSubject(userId)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();
        }
    }

    세션 부분을 추가하여 로그인을 할 경우 세션을 생성 후, 
    로그인 정보를 앞단에 전달할 때 함께 세션 토큰을 넣어서 전달한다.

## CRUD 게시판 (추가, 조회, 수정, 삭제) 구현 
    조회 할 경우 redux-saga 기술 활용
    redux-saga 란? 
        redux의 비동기 처리를 도와주는 Middleware(미들웨어) 중 하나로,
        Generator 함수 기반으로 작성돼서
        복잡한 api 호출 흐름을 동기적인 코드처럼 깔끔하게 구성할 수 있다.

    redux-saga 를 사용한 이유는?
        dispatch - api 요청 - 결과 저장, 흐름을 분리해서 관리 할 수 있기 때문이다.
        try/catch, call, put, takeLatest 같은 효과 함수로, 
        비동기 요청 흐름을 명확하게 패턴화 할 수 있기 때문이다.
        Stroe 에 데이터를 저장하고, 다른 페이지/컴포넌트에서 useSelector 로 재사용이 가능하다.

## 페이징 기법 구현
    페이징(Pagination) : 전체 데이터 중 일부만 잘라서 한 번에 보여주는 기술
    - 대량의 데이터를 한 번에 불러오면 성능 이슈(서버, 브라우저 둘 다 부담)
    - UX 측면에서도 "스크롤 무한" 보다 명확한 구간 구분이 좋을 때 많음
    - 리스트형 UI(게시판, 상품 목록 등) 에 필수 기능

    현재 구현한 페이징 방식은 (react + redux + saga) 기반 게시판으로
    "클라이언트 주도 + 서버 연동+ 페이징을 적용하였다.

    특징
    - 버튼 기반 페이지 이동 UI
    - 그룹 단위 페이지 버픈 갱신 (5개씩)
    - 버튼 누르면 cureentPage 변경, 필요 시 pageStart 갱신
    - redux + saga 를 통해 서버로 currentPage, size 를 전달 API 호출

    백엔드 페이징 방식(Oracle)
    oracle sql 에서 Row_NUMBER()를 활용한 정확한 순서 기반 페이징을 사용하였다.


