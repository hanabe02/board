package com.example.board_back.login.controller;

import com.example.board_back.login.service.loginService;
import com.example.board_back.login.to.memberTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@CrossOrigin("http://localhost:5173")
@RequestMapping("/api")
@RestController
public class loginController {
    @Autowired
    loginService loginservice;
    @GetMapping("/login")
    public Map<String, Object> loginController(@RequestParam String id, @RequestParam String pw) {
        System.out.println("\n" + id);
        System.out.println(pw + "\n");
        Map<String, Object> user = loginservice.loginInfo(id, pw);
        return user;
    }
    @PostMapping("/test")
    public void loginTest(){
        System.out.println("정상적으로 실행이 됨");
    }
}
