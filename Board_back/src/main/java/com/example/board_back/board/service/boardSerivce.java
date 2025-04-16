package com.example.board_back.board.service;

import com.example.board_back.board.to.BoardTO;


import java.util.List;
import java.util.Map;

public interface boardSerivce {
    public List<BoardTO> getBoardInfo(int currentPage, int size);
    public Map<String, Object> getTotalPages();
    public void postWriteInsert(String writer, String title, String content);
    public void petchBoardUpdate(Long boardId, String content);
    public void deleteBoard(Long boardId);
}
