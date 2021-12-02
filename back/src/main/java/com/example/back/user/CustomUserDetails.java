package com.example.back.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Builder
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private String identifier;
    private String password;
    private String nickName;
    private Collection<? extends GrantedAuthority> authorities;

    public static CustomUserDetails of(UserDto user){
        return CustomUserDetails.builder()
                .identifier(user.getIdentifier())
                .password(user.getPassword())
                .nickName(user.getNickName())
                .authorities(Collections.singleton(new SimpleGrantedAuthority(user.getUserRole().getKey())))
                .build();
    }

    public String getNickName(){return nickName;}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return identifier;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
