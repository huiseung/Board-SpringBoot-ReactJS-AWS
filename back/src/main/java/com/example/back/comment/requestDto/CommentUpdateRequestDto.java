package com.example.back.comment.requestDto;


import lombok.AllArgsConstructor;
import lombok.Getter;


//@RequestBody는 속성이 1개인 클래스에 대해 Unexpected exception occurred: JSON parse error가 발생하는것 같다.
@Getter
@AllArgsConstructor
public class CommentUpdateRequestDto {
    private Long commentId;
    private String content;
}
