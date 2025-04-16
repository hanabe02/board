export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// loginRequest 실행 시 -> 객체가 생성된다.
export const loginClick = (id, pw) => ({
    type: LOGIN_REQUEST, // 액션의 타입을 지정, (요청, 성공, 실패)
    payload: { id, pw }, // 전달할 데이터 (id, pw)
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logout = () => ({
    type: LOGOUT
});