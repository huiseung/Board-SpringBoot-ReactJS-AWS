package com.example.back.post.requestDto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
@AllArgsConstructor
public class PostCreateRequestDto {
    private String author;
    private String title;
    private String content;
    private String prevContent;
    private String category;
}
