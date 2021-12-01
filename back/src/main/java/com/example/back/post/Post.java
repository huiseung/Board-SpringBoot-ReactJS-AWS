package com.example.back.post;


import com.example.back.baseTime.BaseTimeEntity;
import com.example.back.comment.Comment;
import com.example.back.image.Image;
import com.example.back.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;



@Table(name="posts")
@Getter
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Post extends BaseTimeEntity {
    @Column(name="post_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //
    @JoinColumn(name="user_id")
    @ManyToOne
    private User user;

    @OneToOne(mappedBy = "post")
    private Image thumbnail;

    @Builder.Default
    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

//    @Builder.Default
//    @OneToMany(mappedBy = "post")
//    private List<Image> images = new ArrayList<>();

    //
    @Column(nullable = false)
    private String title;
    @Lob
    @Column(nullable = false)
    private String content;
    @Lob
    @Column
    private String prevContent;

    @Column
    @Enumerated(EnumType.STRING)
    private PostCategory category;
    //
    public void setUser(User user){
        if(this.user != null) {
            this.user.getPosts().remove(this);
            user.getPosts().add(this);
        }
        this.user = user;
    }
}
