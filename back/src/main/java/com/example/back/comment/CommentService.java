package com.example.back.comment;


import com.example.back.comment.requestDto.CommentCreateRequestDto;
import com.example.back.comment.requestDto.CommentUpdateRequestDto;
import com.example.back.comment.responseDto.CommentCreateResponseDto;
import com.example.back.post.Post;
import com.example.back.post.PostRepository;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    @Transactional
    public CommentCreateResponseDto save(String identifier, CommentCreateRequestDto requestDto){
        Post post = postRepository.findById(requestDto.getPostId())
                .orElseThrow(()->new IllegalArgumentException("post가 없습니다"));
        User user = userRepository.findByIdentifier(identifier)
                .orElseThrow(()->new IllegalArgumentException("user가 없습니다"));
        Comment comment = Comment.builder()
                .content(requestDto.getContent())
                //.author(requestDto.getAuthor())
                .build();
        comment.setPost(post);
        comment.setUser(user);
        return CommentCreateResponseDto.of(commentRepository.save(comment));
    }

    @Transactional
    public CommentCreateResponseDto update(String identifier, Long commentId, CommentUpdateRequestDto requestDto){
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(()->new IllegalArgumentException(""));
        if(Objects.equals(identifier, comment.getUser().getIdentifier())){
            comment.update(requestDto);
            return CommentCreateResponseDto.of(commentRepository.save(comment));
        }
        throw new IllegalArgumentException("");
    }

    @Transactional
    public String delete(String identifier, Long commentId){
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(()->new IllegalArgumentException(""));
        if(Objects.equals(comment.getUser().getIdentifier(), identifier)){
            commentRepository.delete(comment);
            return "delete success" + Long.toString(comment.getId());
        }
        throw new IllegalArgumentException("");
    }
}
