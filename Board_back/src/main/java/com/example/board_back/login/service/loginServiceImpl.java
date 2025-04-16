package com.example.board_back.login.service;

import com.example.board_back.jwt.JwtUtil;
import com.example.board_back.login.to.memberTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.board_back.login.DAO.LoginMapper;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;


@Service
public class loginServiceImpl implements loginService {
    @Autowired
    LoginMapper loginMapper;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public Map<String, Object> loginInfo(String id, String pw) {
        ArrayList<memberTO> userList = loginMapper.loginInfo(id, pw);

        Map<String, Object> result = new HashMap<>();
        result.put("user", userList);

        if (!userList.isEmpty()) {
            String token = jwtUtil.generateToken(id);
            result.put("serviceToken", token); // ✅ 이게 핵심!
        }

        return result;
    }
}
