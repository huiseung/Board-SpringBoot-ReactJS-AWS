package com.example.back.user;


import com.example.back.user.requestDto.SignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void signUp(SignUpRequestDto requestDto){
        User user = User.builder()
                .identifier(requestDto.getIdentifier())
                .password(bCryptPasswordEncoder.encode(requestDto.getPassword()))
                .nickName(requestDto.getIdentifier())
                .userRole(UserRole.USER)
                .build();
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public UserDto findByIdentifier(String identifier){
        User user = userRepository.findByIdentifier(identifier)
                .orElseThrow(()->new IllegalArgumentException("We can't find User by Identifier(="+identifier+")"));
        return UserDto.of(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = findByIdentifier(username);
        return CustomUserDetails.of(user);
    }

}
