package com.example.back.auth.requestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
@AllArgsConstructor
public class LoginRequestDto {
    private String identifier;
    private String password;
}

