package com.example.board_back.login.to;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class memberTO {
    private String id;
    private String pw;
    private String zipcode;
    private String address;
    private String addressDetail;
    private String picture;
    private Date regdate;
}
