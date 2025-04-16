// 액션 타입 정의
export const EDIT_PROFILE_REQUEST = "EDIT_PROFILE_REQUEST"; // 요청
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS"; // 성공
export const EDIT_PROFILE_FAILURE = "EDIT_PROFILE_FAILURE"; // 실패

// 회원 정보 수정 요청 액션 (Redux-Saga에서 이걸 가로챔)
export const editProfileRequest = (name, id, email, password) => ({
    type: EDIT_PROFILE_REQUEST,
    payload: { name, id, email, password }
});

// 회원 정보 수정 성공 액션 (Saga에서 API 호출 후 디스패치)
export const editProfileSuccess = (user) => ({
    type: EDIT_PROFILE_SUCCESS,
    payload: user
});

// 회원 정보 수정 실패 액션
export const editProfileFailure = (error) => ({
    type: EDIT_PROFILE_FAILURE,
    payload: error
});