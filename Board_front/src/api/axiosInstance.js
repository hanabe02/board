// src/api/axiosInstance.js
import axios from "axios";

// ✅ 새 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: "http://localhost:8887/api", // API 주소는 프로젝트에 맞게
    withCredentials: true, // 쿠키 전송 필요 시 true
});

// ✅ 요청 인터셉터 - 토큰 자동 첨부 (있을 경우)
axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("serviceToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ✅ 응답 인터셉터 - 401 에러 처리
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("⛔️ 인증 실패: 토큰 만료 또는 유효하지 않음");

            // 토큰이 존재한 상태에서 401이면 → 진짜 만료된 걸로 간주
            if (sessionStorage.getItem("serviceToken")) {
                sessionStorage.removeItem("serviceToken");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
