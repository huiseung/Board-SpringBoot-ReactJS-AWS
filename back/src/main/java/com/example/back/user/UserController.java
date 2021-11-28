package com.example.back.user;


import com.example.back.user.requestDto.SignUpRequestDto;
import com.example.back.utils.ApiUtils;
import com.example.back.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;

import static com.example.back.utils.ApiUtils.success;

@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000",  "https://board.huiseung.com"})
@RequestMapping("/api/users")
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping
    public ApiResult signUp(@RequestBody SignUpRequestDto requestDto){
        userService.signUp(requestDto);
        return success("signUp success");
    }
}
