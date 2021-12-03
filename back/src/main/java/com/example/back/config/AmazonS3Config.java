package com.example.back.config;


import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.BucketCrossOriginConfiguration;
import com.amazonaws.services.s3.model.CORSRule;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Configuration
public class AmazonS3Config {
    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;
    @Value("${cloud.aws.region.static}")
    private String region;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Bean
    @Primary
    public BasicAWSCredentials awsCredentials(){
        return new BasicAWSCredentials(accessKey, secretKey);
    }

    @Bean
    public AmazonS3 amazonS3(){
        AmazonS3 client = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials()))
                .build();
//        BucketCrossOriginConfiguration corsConfig = client.getBucketCrossOriginConfiguration(bucket);
//        List<CORSRule> rules = corsConfig == null ? new ArrayList<>(): corsConfig.getRules();
//        Collections.singletonList();
//        List<CORSRule.AllowedMethods> allowedMethodsList = new ArrayList<>();
//        allowedMethodsList.add(CORSRule.AllowedMethods.GET);
//        allowedMethodsList.add(CORSRule.AllowedMethods.POST);
//        allowedMethodsList.add(CORSRule.AllowedMethods.DELETE);
//        rules.add(new CORSRule()
//                .withAllowedOrigins(Collections.singletonList("*"))
//                .withAllowedHeaders(Collections.singletonList("*"))
//                .withAllowedMethods(allowedMethodsList)
//        );
//        client.setBucketCrossOriginConfiguration(bucket, new BucketCrossOriginConfiguration().withRules(rules));
//                //.withExposedHeaders(Collections.singletonList("Access-Control-Allow-Origin"))
//                //.withAllowedHeaders(Collections.singletonList("Authorization")));
        return client;
    }
}
