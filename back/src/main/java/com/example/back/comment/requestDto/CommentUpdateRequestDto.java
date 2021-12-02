package com.example.back.comment.requestDto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentUpdateRequestDto {
    private String content;
}
