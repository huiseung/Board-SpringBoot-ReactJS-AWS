package com.example.back.post.responseDto;


import com.example.back.post.PostDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PostCreateResponseDto {
    private Long postId;

    public static PostCreateResponseDto of(PostDto postDto){
        return PostCreateResponseDto.builder()
                .postId(postDto.getId())
                .build();
    }
}