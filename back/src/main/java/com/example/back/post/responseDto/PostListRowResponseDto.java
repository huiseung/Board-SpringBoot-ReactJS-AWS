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
    private String thumbnailPath;
    private String title;
    private String prevContent;
    private String author;
    private String createAt;

    public static PostListRowResponseDto of(Post post){
        PostListRowResponseDto postListRowResponseDto = PostListRowResponseDto.builder()
                .postId(post.getId())
                .category(post.getCategory().name())
                .title(post.getTitle())
                .prevContent(post.getPrevContent())
                .author(post.getUser().getNickName())
                .createAt(post.getCreateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .build();

        if(post.getThumbnail() != null) {
            postListRowResponseDto.setThumbnailPath(post.getThumbnail().getFileName());
        }
        return postListRowResponseDto;
    }

    private void setThumbnailPath(String thumbnailPath){
        this.thumbnailPath = thumbnailPath;
    }
}