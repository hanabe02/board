import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from "./authActions";
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios';
// import loginService from './authApi';

// const GET_API_URL = '/api/login/';

// const loginApi = async (username, password) => {
//     console.log(username);
//     console.log(password);
//     try {
//         // const response = await loginService.post("/api/login", {
//         //     params: {username, password}
//         // });
//         // const response = await api.post('/api/login', { username, password});
//         const response = await axios.post('http://localhost:8887/api/login', {
//             username: "test",
//             password: "1234"
//         });
//         console.log(response);
//         return response.data;
//         // return response.data.gridRowJson;
//     } catch (error) {
//         console.error("Login API error:", error);
//         throw error;
//     }
// }

const loginApi = async (id, pw) => {
    console.log(id);
    console.log(pw);
    try {
        const response = await axios.get('http://localhost:8887/api/login', {
            params: {
                id,
                pw
            }
        });

        console.log("✅ Login Response:", response);
        return response.data;
    } catch (error) {
        console.error("❌ Login API error:", error.message);
        throw error;
    }
};

function* handleLogin(action) {
    try {
        console.log("saga 실행됨", action.payload);
        const response = yield call(loginApi, action.payload.id, action.payload.pw);
        console.log(response);
        // console.log(response.serviceToken);

        if (!response) {
            throw new Error("❌ loginApi 응답이 undefined임");
        }
        const token = response.serviceToken;

        if (token) {
            // ✅ 토큰을 localStorage에 저장 (여기가 핵심!)
            localStorage.setItem('accessToken', token);

            console.log("🎉 LOGIN_SUCCESS 디스패치 + 토큰 저장됨");
            yield put(loginSuccess(response));
        } else {
            console.log("❌ LOGIN_FAILURE 디스패치 실행됨");
            yield put(loginFailure("토큰이 없습니다"));
        }
    } catch (error) {
        console.error("❌ LOGIN_FAILURE:", error.message);
        yield put(loginFailure(error.message));
    }
}

export default function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, handleLogin);
}