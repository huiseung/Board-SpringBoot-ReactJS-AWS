package com.example.back.post;


import com.example.back.comment.Comment;
import com.example.back.comment.CommentDto;
import com.example.back.image.Image;
import com.example.back.image.ImageDto;
import com.example.back.user.User;
import com.example.back.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@Builder
@AllArgsConstructor
public class PostDto {
    private Long id;
    private User user;
    private List<Comment> comments;
    private List<Image> images;
    private String title;
    private String content;
    private PostCategory category;
    private LocalDateTime createAt;


    public static PostDto of(Post post){
        return PostDto.builder()
                .id(post.getId())
                .user(post.getUser())
                .comments(post.getComments())
                .images(post.getImages())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .createAt(post.getCreateAt())
                .build();
    }
}
