package com.example.back.comment;


import com.example.back.comment.requestDto.CommentCreateRequestDto;
import com.example.back.comment.responseDto.CommentCreateResponseDto;
import com.example.back.utils.ApiUtils;
import com.example.back.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static com.example.back.utils.ApiUtils.success;

@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000", "https://board.huiseung.com"})
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@RestController
public class CommentController {
    private final CommentService commentService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ApiResult create(@RequestBody CommentCreateRequestDto requestDto){
        return success(CommentCreateResponseDto.of(commentService.save(requestDto)));
    }

}
