package com.example.back.user;


import com.example.back.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class UserDto {
    private Long id;
    private List<Post> posts;
    private UserRole userRole;
    private String nickName;
    private String identifier;
    private String password;

    public static UserDto of(User user){
        return UserDto.builder()
                .id(user.getId())
                .posts(user.getPosts())
                .userRole(user.getUserRole())
                .nickName(user.getNickName())
                .identifier(user.getIdentifier())
                .password(user.getPassword())
                .build();
    }
}
