import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, } from "./authActions";

const initialState = {
    user: null,
    serviceToken: false,
    loading: false,
    error: null,
};

// ✅ 액션을 받아 상태 업데이트
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null }; // ✅ 로그인 진행 중
        case LOGIN_SUCCESS:
            console.log("성공");
            console.log(action.payload);
            console.log(action.payload.user[0]);
            console.log(action.payload.serviceToken);
            


            return {
                ...state,
                user: action.payload.user[0],
                serviceToken: action.payload.serviceToken,
                loading: false
            }; // ✅ 로그인 성공
        case LOGIN_FAILURE:
            console.log("실패");
            return { ...state, error: action.payload, loading: false }; // ✅ 로그인 실패
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;