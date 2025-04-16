import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginClick } from "../redux/auth/authActions";


function LoginPage({ setIsLoggedIn }) {
    const [id, setUsername] = useState("");
    const [pw, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const serviceToken = useSelector((state) => state.auth.serviceToken);


    const handleLogin = () => {
        console.log(id);
        console.log(pw);
        // 로그인 성공했다고 가정
        // setIsLoggedIn(true);
        // navigate("/board");
        dispatch(loginClick(id, pw));
    };

    useEffect(() => {
        console.log(serviceToken);
        if (serviceToken) {
            setIsLoggedIn(true);
            navigate("/board");
        }
    }, [serviceToken]);


    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-logo">Hanabe</h2>

                <input
                    type="text"
                    placeholder="아이디"
                    className="login-input"
                    value={id}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="login-input"
                    value={pw}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="checkbox-container">
                    <input type="checkbox" id="keep-login" />
                    <label htmlFor="keep-login">로그인 상태 유지</label>
                </div>

                <button className="login-button" onClick={handleLogin}>로그인</button>
                
                <div className="footer-links">
                    <a href="#">회원가입</a>
                    <a href="#">넥슨ID 찾기</a>
                    <a href="#">비밀번호 찾기</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;