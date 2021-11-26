package com.example.back.auth.responseDto;

import com.example.back.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
@AllArgsConstructor
public class LoginResponseDto {
    private String nickName;
    private UserRole userRole;
    private String accessToken;
}
