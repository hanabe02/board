package com.example.board_back.login.DAO;

import org.apache.ibatis.annotations.Mapper;
import com.example.board_back.login.to.memberTO;
import java.util.ArrayList;

@Mapper
public interface LoginMapper {
    public ArrayList<memberTO> loginInfo(String id, String pw);
}
