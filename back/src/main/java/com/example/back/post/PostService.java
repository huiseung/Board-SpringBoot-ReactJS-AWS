package com.example.back.post;


import com.example.back.image.ImageService;
import com.example.back.post.requestDto.PostCreateRequestDto;
import com.example.back.post.responseDto.PostListResponseDto;
import com.example.back.post.responseDto.PostListRowResponseDto;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ImageService imageService;
    private static final Logger log = LoggerFactory.getLogger(PostService.class);

    @Transactional
    public PostDto create(PostCreateRequestDto requestDto, List<MultipartFile> files){
        //log.info("post create "+requestDto);
        User user = userRepository.findByNickName(requestDto.getAuthor());
        Post post = Post.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .category(PostCategory.valueOf(requestDto.getCategory()))
                .build();
        post.setUser(user);
        Post savePost = postRepository.save(post);
        imageService.save(savePost, files);
        return PostDto.of(savePost);
    }

    @Transactional
    public PostDto readDetail(Long postId){
        return PostDto.of(postRepository.findById(postId).orElseThrow(()->new IllegalArgumentException("")));
    }

    @Transactional
    public PostListResponseDto readList(int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createAt").descending());
        //PageRequest pageRequest = PageRequest.of(page, size);
        Page<Post> posts = postRepository.findAll(pageRequest);
        List<PostListRowResponseDto> postDtos = posts.stream().map(PostListRowResponseDto::of).collect(Collectors.toList());
        for(PostListRowResponseDto postDto:postDtos){
            log.info("postList read: "+postDto);
        }
        Boolean isLast = posts.isLast();
        return PostListResponseDto.builder()
                .postListRowResponseDtoList(postDtos)
                .isLast(isLast)
                .build();
    }
}

