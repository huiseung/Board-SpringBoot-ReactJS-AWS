package com.example.back.comment;


import com.example.back.comment.requestDto.CommentCreateRequestDto;
import com.example.back.utils.ApiUtils;
import com.example.back.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.example.back.utils.ApiUtils.success;


@RequestMapping("/api/comments")
@RequiredArgsConstructor
@RestController
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ApiResult create(@RequestBody CommentCreateRequestDto requestDto){
        return success(commentService.save(requestDto));
    }
}
