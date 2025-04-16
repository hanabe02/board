package com.example.board_back.board.to;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "board")
public class BoardTO {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "board_seq")
    @SequenceGenerator(name = "board_seq", sequenceName = "BOARD_SEQ", allocationSize = 1)
    @Column(name = "board_id")
    private Long boardId;

    @Column(nullable = false, length = 50)
    private String writer;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDate regdate;

    @Column
    private LocalDate updatedate;

    @Column
    private LocalDate deletedate;

    @Builder
    public BoardTO(Long boardId, String writer, String title, String content, LocalDate regdate, LocalDate updatedate, LocalDate deletedate) {
        this.boardId = boardId;
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.regdate = regdate;
        this.updatedate = updatedate;
        this.deletedate = deletedate;
    }
}