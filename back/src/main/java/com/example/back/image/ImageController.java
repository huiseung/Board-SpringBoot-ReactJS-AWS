package com.example.back.image;


import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000", "https://board.huiseung.com"})
@RequestMapping("/api/images")
@RequiredArgsConstructor
@RestController
public class ImageController {
    private final ImageService imageService;

    @GetMapping(produces = "image/*")
    public ResponseEntity<ByteArrayResource> download(@RequestParam("fileName") String fileName){
        byte[] data = imageService.download(URLEncoder.encode(fileName, StandardCharsets.UTF_8));
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "image/*")
                //.contentType(MediaType.IMAGE_PNG)
                //.header("Content-type", "application/octec-stream")
                .header("Content-disposition", "attachment; filename=\""+fileName+"\"")
                .body(resource);
    }
}
