package com.example.board_back.board.DAO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {
    Integer boardNumber();
    public void postWriterInsert(Integer boardId, String writer, String title, String content);
    public void patchBoardUpdate(Long boardId, String content);
    public void deleteBoard(Long boardId);
}
