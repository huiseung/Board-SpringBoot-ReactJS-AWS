package com.example.back.comment.responseDto;

import com.example.back.comment.Comment;
import com.example.back.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Objects;

@Getter
@Builder
@AllArgsConstructor
public class CommentListResponseDto {
    Long id;
    String content;
    String author;
    boolean isEdit;

    public static CommentListResponseDto of(String viewerIdentifier, Comment comment){
        User user = comment.getUser();
        return CommentListResponseDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(user.getNickName())
                .isEdit(Objects.equals(viewerIdentifier, user.getIdentifier()))
                .build();
    }
}
