package com.example.back.post;


import com.example.back.post.requestDto.PostCreateRequestDto;
import com.example.back.post.responseDto.PostCreateResponseDto;
import com.example.back.post.responseDto.PostDetailReadResponseDto;
import com.example.back.post.responseDto.PostListResponseDto;
import com.example.back.user.CustomUserDetails;
import com.example.back.utils.ApiUtils;
import com.example.back.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

import static com.example.back.utils.ApiUtils.success;


@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000", "https://board.huiseung.com"})
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@RestController
public class PostController {
    private final PostService postService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ApiResult create(@AuthenticationPrincipal CustomUserDetails userDetails,
                            @RequestPart(value="data") PostCreateRequestDto requestDto,
                            @RequestPart(value="images", required = false) List<MultipartFile> images) throws Exception{
        return success(postService.create(userDetails.getUsername(), requestDto, images));
    }

    @GetMapping("/{postId}")
    public ApiResult readDetail(@AuthenticationPrincipal CustomUserDetails userDetails,
                                @PathVariable("postId")Long postId){
        return success(postService.readDetail(userDetails.getUsername(), postId));
    }

    @GetMapping
    public ApiResult readList(@RequestParam(value="page", defaultValue = "0") int page,
                                       @RequestParam(value="size", defaultValue = "5") int size){
        return success(postService.readList(page, size));
    }



    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/{postId}")
    public ApiResult delete(@AuthenticationPrincipal CustomUserDetails userDetails,
                            @PathVariable("postId")Long postId){
        return success(postService.delete(userDetails.getUsername(), postId));
    }
}
