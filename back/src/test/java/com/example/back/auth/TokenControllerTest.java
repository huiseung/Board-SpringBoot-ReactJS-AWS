package com.example.back.auth;

import com.example.back.auth.requestDto.LoginRequestDto;
import com.example.back.config.ConfigUtils;
import com.example.back.user.UserService;
import com.example.back.user.requestDto.SignUpRequestDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@TestPropertySource(properties = { "spring.config.location=classpath:application-test.yml" })
@AutoConfigureMockMvc
@SpringBootTest
public class TokenControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ConfigUtils configUtils;

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

    @Nested
    @DisplayName("Login Test")
    class LoginTest {
        @Test
        @DisplayName("login success")
        public void login_success() throws Exception{
            LoginRequestDto requestDto = LoginRequestDto.builder()
                    .identifier(initId)
                    .password(initPassword)
                    .build();
            String requestBody = objectMapper.writeValueAsString(requestDto);

            MvcResult result = mockMvc.perform(
                            MockMvcRequestBuilders.post("/api/tokens")
                                    .content(requestBody)
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .accept(MediaType.APPLICATION_JSON)
                    )
                    .andExpect(status().isOk())
                    .andExpect(cookie().exists(configUtils.getProperty("token.header")))
                    .andDo(MockMvcResultHandlers.print())
                    .andReturn();
        }
    }
}
