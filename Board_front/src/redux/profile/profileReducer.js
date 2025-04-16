import { EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE } from "./profileActions";

const initialState = {
    user: null,
    loading: false,
    error: null
};

// 리듀서
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            console.log("디버깅 포인트 : 진행!");

            return {
                ...state,
                loading: true,
                error: null
            };
        case EDIT_PROFILE_SUCCESS:
            console.log("디버깅 포인트 : 성공!");

            return {
                ...state,
                user: action.payload,  // 업데이트된 회원 정보 저장
                loading: false
            };
        case EDIT_PROFILE_FAILURE:
            console.log("디버깅 포인트 : 실패!");

            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default profileReducer;