package com.example.back.image;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;


@RequiredArgsConstructor
@Service
public class S3Service {
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public void upload(InputStream inputStream, String storagePath, ObjectMetadata objectMetadata){
        amazonS3.putObject(
                new PutObjectRequest(bucket, storagePath, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead)
        );
    }

    @Transactional
    public byte[] download(String storagePath){
        S3Object s3Object = amazonS3.getObject(bucket, storagePath);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try{
            return IOUtils.toByteArray(inputStream);
        }catch(IOException e){
            e.printStackTrace();
        }
        return null;
    }

    @Transactional
    public void delete(String storagePath){
        amazonS3.deleteObject(bucket, storagePath);
    }
}
