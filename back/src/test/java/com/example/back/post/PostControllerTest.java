package com.example.back.post;


import com.example.back.user.UserService;
import com.example.back.user.requestDto.SignUpRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

@TestPropertySource(properties = { "spring.config.location=classpath:application-test.yml" })
@AutoConfigureMockMvc
@SpringBootTest
public class PostControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    public static String initId = "initId";
    public static String initPassword = "initPassword";

    @BeforeAll
    public static void initDB(@Autowired UserService userService){
        SignUpRequestDto requestDto = SignUpRequestDto.builder()
                .identifier(initId)
                .password(initPassword)
                .build();
        userService.signUp(requestDto);
    }



}
