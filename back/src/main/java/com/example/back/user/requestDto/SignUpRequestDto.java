package com.example.back.user.requestDto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;


@ToString
@Getter
@Builder
@AllArgsConstructor
public class SignUpRequestDto {
    private String identifier;
    private String password;
}
