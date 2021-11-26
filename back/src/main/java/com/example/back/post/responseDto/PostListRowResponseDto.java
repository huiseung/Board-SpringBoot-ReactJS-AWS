package com.example.back.post.responseDto;

import com.example.back.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.format.DateTimeFormatter;

@ToString
@Getter
@Builder
@AllArgsConstructor
public class PostListRowResponseDto {
    private Long postId;
    private String category;
    private String title;
    private String author;
    private String createAt;

    public static PostListRowResponseDto of(Post post){
        return PostListRowResponseDto.builder()
                .postId(post.getId())
                .category(post.getCategory().name())
                .title(post.getTitle())
                .author(post.getUser().getNickName())
                .createAt(post.getCreateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .build();
    }
}