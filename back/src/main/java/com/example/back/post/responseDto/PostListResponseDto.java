package com.example.back.post.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
@Builder
@AllArgsConstructor
public class PostListResponseDto {
    private List<PostListRowResponseDto> postListRowResponseDtoList;
    private Boolean isLast;

    public static PostListResponseDto of(List<PostListRowResponseDto> postListRowResponseDtoList, Boolean isLast){
        return PostListResponseDto.builder()
                .postListRowResponseDtoList(postListRowResponseDtoList)
                .isLast(isLast)
                .build();
    }
}