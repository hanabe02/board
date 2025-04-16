package com.example.board_back.board.service;

import com.example.board_back.board.DAO.BoardMapper;
import com.example.board_back.board.to.BoardTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.board_back.board.repository.BoardRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


@Service
public class boardServiceImpl implements boardSerivce{
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private BoardMapper boardMapper;

    public  List<BoardTO> getBoardInfo(int currentPage, int size){
        int start = currentPage * size;
        int end = start + size;

        List<BoardTO> board = boardRepository.findPage(start, end);
        return board;
    }
    public  Map<String, Object> getTotalPages(){
        int size = 10;
        long totalElements = boardRepository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        Map<String, Object> result = new HashMap<>();
        result.put("totalPages", totalPages);
        System.out.println(result);
        return result;
    }


    public void postWriteInsert(String writer, String title, String content){
        Integer boardId = boardMapper.boardNumber();
        System.out.println("\n" + boardId + "\n");
        boardMapper.postWriterInsert(boardId, writer, title, content);
    }
    public void petchBoardUpdate(Long boardId, String content){
        boardMapper.patchBoardUpdate(boardId, content);
    }

    public void deleteBoard(Long boardId){
        boardMapper.deleteBoard(boardId);
    }
}
