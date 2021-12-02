package com.example.back.post.responseDto;


import com.example.back.comment.Comment;
import com.example.back.comment.responseDto.CommentListResponseDto;
import com.example.back.post.Post;
import com.example.back.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
public class PostDetailReadResponseDto {
    private Long id;
    private List<CommentListResponseDto> comments;
    //private List<String> imageFileNames;
    private String title;
    private String content;
    private String category;
    private String author;
    private boolean isEdit;
    private String createAt;


    public static PostDetailReadResponseDto of(String viewerIdentifier, Post post){
        List<CommentListResponseDto> comments = new ArrayList<>();
        for (Comment comment : post.getComments()) {
            comments.add(CommentListResponseDto.of(viewerIdentifier, comment));
        }
        User user = post.getUser();
        return PostDetailReadResponseDto.builder()
                .id(post.getId())
                .comments(comments)
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory().name())
                .author(user.getNickName())
                .createAt(post.getCreateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .isEdit(Objects.equals(viewerIdentifier, user.getIdentifier()))
                .build();
    }
}
