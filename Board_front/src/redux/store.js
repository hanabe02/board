import { configureStore } from "@reduxjs/toolkit";
// redux 설정을 더 간단하게 도와주는 공식 툴킷
import createSagaMiddleware from 'redux-saga';
// redux의 비동기 처리용 미들웨어 
import rootReducer from './rootReducer';
// 여러 reducer를 합친 것
import rootSaga from './rootSaga';
// 여러 Saga를 합친 루트 사가

// redux-saga 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();
// redux-saga 미들웨어를 생성

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
// reducer 스토어에 들어갈 전체 리듀서 등록
// middleware : redux 미들웨어 설정
// getDefalulMiddleware() 
//  redux toolkit 이 제공하는 기본 미들웨어 (redux-saga, serializablecheck 등)
// concat(sagaMiddleware) 기본 미들웨어 뒤에 sagaMiddleware 추가 등록

sagaMiddleware.run(rootSaga);
// 미들웨어로 등록만 해서는 Saga가 실행되지 않음
// rootSaga를 시작 시켜주는 역할을 한다.

export default store;