import { BOARD_REQUEST, BOARD_TOTALPAGES_REQUEST, boardSuccess, boardFailure, fetchTotalPages } from "./boardActions"
import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../api/api';

const boardApi = async (currentPage, size) => {
    try{
        console.log("디버깅 포인트 currentPage :", currentPage);
        console.log("디버깅 포인트 size : ", size);
        const response = await api.get('/api/board',{
            params: {
                currentPage,
                size
            }
        })
        console.log(response);
        return response.data;
    }catch(error){
        console.error(error.message);
        throw error;
    }
}

const TotalPagesApi = async () => {
    try {
        const response = await api.get('api/totalPages')
        console.log("디버깅 포인트", response);
        return response.data;
    } catch (error) {
        
    }
}

// 2. 실제 Saga 처리 함수
function* handleBoard(action) {
    try {
        console.log("🟡 boardSaga 실행됨");
        console.log(action.payload);
        const { currentPage, size } = action.payload;
        console.log(currentPage);
        console.log(size);
        const data = yield call(boardApi, currentPage, size);         // API 호출
        console.log("디버깅 포인트 data ", data)
        yield put(boardSuccess(data));             // ✅ 성공 액션 디스패치
    } catch (error) {
        console.error("🔴 boardSaga 오류:", error.message);
        yield put(boardFailure(error.message));    // ✅ 실패 액션 디스패치
    }
}

function* handelTotalPages(){
    try {
        console.log("디버깅 포인트 : handelTotalPages");
        const totalPages = yield call(TotalPagesApi);
        console.log("디버깅 포인트 totalPages : ", totalPages);
        yield put(fetchTotalPages(totalPages));  
    } catch (error) {
        console.log(error.message);
    }
}


export default function* boardSaga(){
    yield takeLatest(BOARD_REQUEST, handleBoard);
    yield takeLatest(BOARD_TOTALPAGES_REQUEST, handelTotalPages);
}