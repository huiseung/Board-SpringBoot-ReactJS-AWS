package com.example.back.comment;


import com.example.back.comment.requestDto.CommentCreateRequestDto;
import com.example.back.post.Post;
import com.example.back.post.PostRepository;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    @Transactional
    public CommentDto save(CommentCreateRequestDto requestDto){
        Post post = postRepository.findById(requestDto.getPostId())
                .orElseThrow(()->new IllegalArgumentException("post가 없습니다"));
        User user = userRepository.findByNickName(requestDto.getAuthor());
        Comment comment = Comment.builder()
                .content(requestDto.getContent())
                .build();
        comment.setPost(post);
        comment.setUser(user);
        return CommentDto.of(commentRepository.save(comment));
    }
}
