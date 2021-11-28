package com.example.back.comment.responseDto;

import com.example.back.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CommentListResponseDto {
    Long id;
    String content;
    String author;

    public static CommentListResponseDto of(Comment comment){
        return CommentListResponseDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(comment.getAuthor())
                .build();
    }
}
