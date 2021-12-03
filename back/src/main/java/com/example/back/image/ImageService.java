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
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final S3Service s3Service;


    @Transactional
    public void upload(Post post, MultipartFile file){
        String fileName = URLEncoder.encode(Objects.requireNonNull(file.getOriginalFilename()), StandardCharsets.UTF_8);
        String storagePath =  URLEncoder.encode(System.currentTimeMillis()+"_"+file.getOriginalFilename(), StandardCharsets.UTF_8);
        System.out.println("upload");
        System.out.println("fileName"+fileName);
        System.out.println("storagePath"+storagePath);
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
                .fileName(fileName)
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
        String encodeFileName =  URLEncoder.encode(fileName, StandardCharsets.UTF_8);
        System.out.println("download");
        System.out.println("fileName: "+encodeFileName);
        Image findImage = imageRepository.findByFileName(encodeFileName);
        System.out.println("findImage "+ findImage.getFileName());
        System.out.println("findImage "+ findImage.getStoragePath());
        return s3Service.download(findImage.getStoragePath());
    }
}
