package com.example.back.auth.requestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;


@ToString
@Getter
@Builder
@AllArgsConstructor
public class LoginRequestDto {
    private String identifier;
    private String password;
}

