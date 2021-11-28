package com.example.back.post.responseDto;


import com.example.back.comment.CommentDto;
import com.example.back.comment.responseDto.CommentListResponseDto;
import com.example.back.image.Image;
import com.example.back.image.ImageDto;
import com.example.back.post.PostDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
public class PostDetailReadResponseDto {
    private Long id;
    private List<CommentListResponseDto> comments;
    private List<String> imageFileNames;
    private String title;
    private String content;
    private String category;
    private String author;

    public static PostDetailReadResponseDto of(PostDto postDto){
        return PostDetailReadResponseDto.builder()
                .id(postDto.getId())
                .comments(postDto.getComments().stream().map(CommentListResponseDto::of).collect(Collectors.toList()))
                .imageFileNames(postDto.getImages().stream().map(Image::getFileName).collect(Collectors.toList()))
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .category(postDto.getCategory().name())
                .author(postDto.getUser().getNickName())
                .build();
    }
}
