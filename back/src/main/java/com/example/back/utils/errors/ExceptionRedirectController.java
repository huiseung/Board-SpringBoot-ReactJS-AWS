package com.example.back.utils.errors;


import com.example.back.utils.ApiUtils.ApiResult;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

import static com.example.back.utils.ApiUtils.error;

@RequestMapping("/exception")
@RestController
public class ExceptionRedirectController {
    @GetMapping("/entrypoint")
    public ApiResult entrypointException(){
        throw new UnauthenticatedException("Authentication Exception, your token is wrong");
    }

    @GetMapping("/accessDenied")
    public ApiResult accessDeniedException(){
        return error(new AccessDeniedException("Authorization Exception"), HttpStatus.FORBIDDEN);
    }
}
