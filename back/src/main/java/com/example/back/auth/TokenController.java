package com.example.back.auth;


import com.example.back.auth.requestDto.LoginRequestDto;
import com.example.back.auth.responseDto.LoginResponseDto;
import com.example.back.config.ConfigUtils;
import com.example.back.user.UserDto;
import com.example.back.user.UserService;
import com.example.back.utils.ApiUtils;
import com.example.back.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Collection;

import static com.example.back.utils.ApiUtils.error;
import static com.example.back.utils.ApiUtils.success;


@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000"})
@RequestMapping("/api/tokens")
@RequiredArgsConstructor
@RestController
public class TokenController {
    private final ConfigUtils configUtils;
    private final TokenService tokenService;
    private final UserService userService;

    @PostMapping
    public ApiResult login(@RequestBody LoginRequestDto requestDto, HttpServletResponse response){
        LoginResponseDto responseDto = tokenService.login(requestDto);
        Cookie cookie = new Cookie(configUtils.getProperty("token.header"), responseDto.getAccessToken());
        cookie.setPath("/");
        cookie.setMaxAge(Integer.parseInt(configUtils.getProperty("token.accessToken.expirationTimeSec")));
        response.addCookie(cookie);
        Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
        for(String header: headers){
            System.out.println(header);
            response.setHeader(HttpHeaders.SET_COOKIE, header+"; Secure; SameSite=None");
        }
        return success(responseDto);
    }

    @DeleteMapping
    public ApiResult logout(HttpServletResponse response){
        Cookie cookie = new Cookie(configUtils.getProperty("token.header"), null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
        for(String header: headers){
            System.out.println(header);
            response.setHeader(HttpHeaders.SET_COOKIE, header+"; Secure; SameSite=None");
        }
        return success("logout success");
    }

    @GetMapping
    public ApiResult authCheck(HttpServletRequest request){
        String accessToken = tokenService.getTokenFromRequest(request);
        if(StringUtils.hasText(accessToken) && tokenService.validateToken(accessToken)){
            String identifier = tokenService.getUserNameFromToken(accessToken);
            UserDto userDto = userService.findByIdentifier(identifier);
            return success(LoginResponseDto.builder()
                    .nickName(userDto.getNickName())
                    .userRole(userDto.getUserRole())
                    .accessToken(accessToken)
                    .build());
        }
        return error("token error", HttpStatus.FORBIDDEN);
    }
}
