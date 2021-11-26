package com.example.back.auth;


import com.example.back.auth.requestDto.LoginRequestDto;
import com.example.back.auth.responseDto.LoginResponseDto;
import com.example.back.config.ConfigUtils;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import com.example.back.utils.errors.NotFoundException;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;


@RequiredArgsConstructor
@Service
public class TokenService {
    private Long accessTokenExpirationTimeMs;
    private String secretKey;

    private final ConfigUtils configUtils;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    @PostConstruct
    protected void init(){
        secretKey = configUtils.getProperty("token.secretKey");
        secretKey = Base64.encodeBase64String(secretKey.getBytes(StandardCharsets.UTF_8));
        accessTokenExpirationTimeMs = Long.parseLong(configUtils.getProperty("token.accessToken.expirationTimeSec"))*1000;
    }

    @Transactional
    public LoginResponseDto login(LoginRequestDto requestDto){
        User user = userRepository.findByIdentifier(requestDto.getIdentifier())
                .orElseThrow(() -> new IllegalArgumentException("We can't find User by Identifier(="+requestDto.getIdentifier()+")"));
        if(!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())){
            String logString = "login password error\n"
                    + "request_password: "+ requestDto.getPassword();
            throw new IllegalArgumentException("We can't find User by Password(="+requestDto.getPassword()+")");
        }
        TokenDto tokenDto = createToken(user.getIdentifier());
        return LoginResponseDto.builder()
                .nickName(user.getNickName())
                .userRole(user.getUserRole())
                .accessToken(tokenDto.getAccessToken())
                .build();
    }

    public TokenDto createToken(String useName){
        Claims claims = Jwts.claims().setSubject(useName);
        Date curDate = new Date();
        Date expirationDate = new Date(curDate.getTime()+accessTokenExpirationTimeMs);
        String accessToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(claims)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
        return TokenDto.builder()
                .accessToken(accessToken)
                .build();
    }

    public String getTokenFromRequest(HttpServletRequest request){
        if(request.getCookies() == null){
            return null;
        }
        String bearerToken = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(configUtils.getProperty("token.header")))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
        if(StringUtils.hasText(bearerToken)){
            return bearerToken;
        }
        return null;
    }

    private Claims getClaimsFromToken(String token){
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUserNameFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }
}
