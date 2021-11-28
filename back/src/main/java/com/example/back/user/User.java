package com.example.back.user;

import com.example.back.baseTime.BaseTimeEntity;
import com.example.back.comment.Comment;
import com.example.back.post.Post;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;



@Table(name="users")
@Getter
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class User extends BaseTimeEntity {
    @Column(name="user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //
    @Builder.Default
    @OneToMany(mappedBy = "user")
    private List<Post> posts = new ArrayList<>();

//    @Builder.Default
//    @OneToMany(mappedBy = "user")
//    private List<Comment> comments = new ArrayList<>();
    //
    @Enumerated(EnumType.STRING)
    @Column
    private UserRole userRole;
    @Column(unique = true)
    private String nickName;
    @Column(unique = true)
    private String identifier;
    @Column
    private String password;



}
