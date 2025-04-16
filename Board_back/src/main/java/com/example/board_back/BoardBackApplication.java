package com.example.board_back;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
// @MapperScan("com.example.board_back.login.DAO")
public class BoardBackApplication {
	public static void main(String[] args) {
		SpringApplication.run(BoardBackApplication.class, args);
	}

}
