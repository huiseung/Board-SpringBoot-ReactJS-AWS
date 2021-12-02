package com.example.back.comment.responseDto;


import com.example.back.comment.Comment;
import com.example.back.comment.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CommentCreateResponseDto {
    private Long commentId;

    public static CommentCreateResponseDto of(Comment comment){
        return CommentCreateResponseDto.builder()
                .commentId(comment.getId())
                .build();
    }
}
