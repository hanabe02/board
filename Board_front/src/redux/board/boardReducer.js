import { BOARD_REQUEST, BOARD_SUCCESS, BOARD_FAILURE, BOARD_TOTALPAGES, BOARD_TOTALPAGES_REQUEST } from "./boardActions";

const initialState = {
    boardList: [],
    totalPages: 0,
    loading: false,
    error: null,
};

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOARD_REQUEST:
        case BOARD_TOTALPAGES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case BOARD_SUCCESS:
            return {
                ...state,
                boardList: action.payload,
                loading: false,
                error: null,
            };
        case BOARD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case BOARD_TOTALPAGES:
            return {
                ...state,
                totalPages: action.payload, 
            }
        default:
            return state;
    }
};

export default boardReducer;
