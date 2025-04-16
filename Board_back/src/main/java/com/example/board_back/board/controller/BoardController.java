package com.example.board_back.board.controller;

import com.example.board_back.board.to.BoardTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.board_back.board.service.boardSerivce;


import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:5173")
@RequestMapping("/api")
@RestController
public class BoardController {
    @Autowired
    boardSerivce boardservice;
    @GetMapping("/board")
    public  List<BoardTO> getBoardInfo(@RequestParam int currentPage,
                                       @RequestParam int size){
        System.out.println("\n" + currentPage);
        System.out.println(size + "\n");
        List<BoardTO> user = boardservice.getBoardInfo(currentPage, size);
        System.out.println(user);
        return user;
    }
    @GetMapping("/totalPages")
        public  Map<String, Object> getTotalPages(){
        Map<String, Object> user = boardservice.getTotalPages();
        System.out.println(user);
        return user;
    }


    @PostMapping("/write")
    public void postWriter(@RequestBody BoardTO board) {
        String writer = board.getWriter();
        String title = board.getTitle();
        String content = board.getContent();

        System.out.println("\n" + writer);
        System.out.println(title);
        System.out.println(content + "\n");
        boardservice.postWriteInsert(writer, title, content);
    }
    @PatchMapping("/boardUpdate")
    public void updateBoard(@RequestBody BoardTO board){
        // 클라이언트에서 보낸 content를 처리하는 부분
        String content = board.getContent();
        Long boardId = board.getBoardId();

        // 업데이트 로직 구현 (예: DB에서 게시글 내용 업데이트)
        System.out.println("Updated content: " + content);
        System.out.println("Updated content: " + boardId);

        // 성공 응답
        boardservice.petchBoardUpdate(boardId, content);
    }
    @DeleteMapping("/boardDelete")
    public void deleteBoards(@RequestBody BoardTO board){
        Long boardId = board.getBoardId();
        System.out.println("Deleted content: " + boardId);
        boardservice.deleteBoard(boardId);
    }
}
