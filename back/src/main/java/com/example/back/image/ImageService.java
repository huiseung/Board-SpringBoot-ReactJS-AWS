package com.example.back.image;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.back.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final S3Service s3Service;


    @Transactional
    public void upload(Post post, MultipartFile file){
        String storagePath = System.currentTimeMillis()+"_"+file.getOriginalFilename();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        //objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentType("image/*");
        try(InputStream inputStream = file.getInputStream()){
            s3Service.upload(inputStream, storagePath, objectMetadata);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Image image = Image.builder()
                .fileName(file.getOriginalFilename())
                .storagePath(storagePath)
                .build();
        image.setPost(post);
        imageRepository.save(image);
    }

    @Transactional
    public void save(Post post, List<MultipartFile> files){
        if(files != null){
            for (MultipartFile file : files) {
                upload(post, file);
            }
        }
    }

    @Transactional
    public byte[] download(String fileName){
        Image findImage = imageRepository.findByFileName(fileName);
        System.out.println("findImage "+ findImage.getFileName());
        System.out.println("findImage "+ findImage.getStoragePath());
        return s3Service.download(findImage.getStoragePath());
    }
}
