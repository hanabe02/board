export const BOARD_TOTALPAGES = "BOARD_TOTALPAGES"; 
export const BOARD_TOTALPAGES_REQUEST = "BOARD_TOTALPAGES_REQUEST";
export const BOARD_REQUEST = "BOARD_REQUEST";
export const BOARD_SUCCESS = "BOARD_SUCCESS";
export const BOARD_FAILURE = "BOARD_FAILURE";

// 게시판 정보 요청 액션 (Saga가 감지)

export const requestTotalPages = () => ({
    type: BOARD_TOTALPAGES_REQUEST, // ✅ useEffect에서 이걸 디스패치
});

export const fetchTotalPages = (totalPages) => ({
    type: BOARD_TOTALPAGES,
    payload: totalPages
})

export const boardInfo = (currentPage, size) => ({
    type: BOARD_REQUEST,
    payload: { currentPage , size}
});

// 게시판 정보 요청 성공 액션 (리듀서로 전달)
export const boardSuccess = (data) => ({
    type: BOARD_SUCCESS,
    payload: data, // 서버로부터 받은 게시글 배열
});

// 게시판 정보 요청 실패 액션
export const boardFailure = (error) => ({
    type: BOARD_FAILURE,
    payload: error,
});