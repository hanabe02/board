package com.example.board_back.board.repository;

import com.example.board_back.board.to.BoardTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardTO, Long> {

    @Query(value = """
        SELECT * FROM (
            SELECT a.*, ROWNUM rnum FROM (
                SELECT * FROM board ORDER BY BOARD_ID DESC
            ) a WHERE ROWNUM <= :end
        ) WHERE rnum > :start
        """, nativeQuery = true)
    List<BoardTO> findPage(@Param("start") int start, @Param("end") int end);

    @Query(value = "SELECT COUNT(*) FROM board", nativeQuery = true)
    int countBoards(); // 총 개수 구하기 (페이지 버튼 만들 때 필요)
}