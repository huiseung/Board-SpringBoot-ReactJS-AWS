package com.example.back.comment;

import com.example.back.post.Post;
import com.example.back.post.PostDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Getter
@Builder
@AllArgsConstructor
public class CommentDto {
    private Long id;
    private Post post;
    private Comment parentComment;
    private List<Comment> childComments;
    private String content;

    public static CommentDto of(Comment comment){
        return CommentDto.builder()
                .id(comment.getId())
                .post(comment.getPost())
                .parentComment(comment.getParentComment())
                .childComments(comment.getChildComments())
                .content(comment.getContent())
                .build();
    }
}
