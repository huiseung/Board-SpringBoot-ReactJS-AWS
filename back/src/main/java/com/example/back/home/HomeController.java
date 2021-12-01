package com.example.back.home;


import com.example.back.post.Post;
import com.example.back.post.PostCategory;
import com.example.back.post.PostRepository;
import com.example.back.post.PostService;
import com.example.back.post.requestDto.PostCreateRequestDto;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import com.example.back.user.UserService;
import com.example.back.user.requestDto.SignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.util.LinkedList;

@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000", "https://board.huiseung.com"})
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class HomeController {
    private final UserService userService;
    private final PostService postService;


    @PostConstruct
    public void initDB(){
        SignUpRequestDto signUpRequestDto = SignUpRequestDto.builder()
                .identifier("testId")
                .password("testPassword")
                .build();
        userService.signUp(signUpRequestDto);
        for(int i = 0; i < 8; i++){
            PostCreateRequestDto postCreateRequestDto = PostCreateRequestDto.builder()
                    .author("testId")
                    .title("testContentTitle"+i)
                    .prevContent("testContentContent"+i)
                    .content("testContentContent"+i)
                    .category(PostCategory.FREE.name())
                    .build();
            postService.create(postCreateRequestDto, new LinkedList<MultipartFile>());
        }
//        for(int i = 0; i < 3; i++){
//            PostCreateRequestDto postCreateRequestDto = PostCreateRequestDto.builder()
//                    .author("testId")
//                    .title("testContentTitle"+i)
//                    .content("testContentContent"+i)
//                    .category(PostCategory.NOVEL.name())
//                    .build();
//            postService.create(postCreateRequestDto, new LinkedList<MultipartFile>());
//        }
    }


    @GetMapping("/health_check")
    public String health_check(){
        return "server health";
    }
}
