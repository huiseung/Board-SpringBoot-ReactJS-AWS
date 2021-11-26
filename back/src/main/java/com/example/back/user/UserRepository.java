package com.example.back.user;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByNickName(String nickName);
    Optional<User> findByIdentifier(String identifier);
}
