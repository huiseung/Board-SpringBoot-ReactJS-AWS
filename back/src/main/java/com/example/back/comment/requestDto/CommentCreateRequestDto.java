package com.example.back.comment.requestDto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentCreateRequestDto {
    private Long postId;
    private String author;
    private String content;
}
