package com.example.back.image;

import com.example.back.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
@AllArgsConstructor
public class ImageDto {
    private Long id;
    private Post post;
    private String fileName;
    private String storagePath;

    public static ImageDto of(Image image){
        return ImageDto.builder()
                .id(image.getId())
                .post(image.getPost())
                .fileName(image.getFileName())
                .storagePath(image.getStoragePath())
                .build();
    }
}
