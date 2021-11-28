package com.example.back.comment;

import com.example.back.baseTime.BaseTimeEntity;
import com.example.back.post.Post;
import com.example.back.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name="comments")
@Getter
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Comment extends BaseTimeEntity {
    @Column(name="comment_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //
    @JoinColumn(name="post_id")
    @ManyToOne
    private Post post;
//    @JoinColumn(name="user_id")
//    @ManyToOne
//    private User user;
    @Column
    private String author;

//    @JoinColumn(name="parent_comment_id")
//    @ManyToOne
//    private Comment parentComment;
//
//    @Builder.Default
//    @OneToMany(mappedBy = "parentComment")
//    private List<Comment> childComments = new ArrayList<>();
    //
    @Column(nullable = false)
    private String content;
    //
    public void setPost(Post post){
        if(post != null){
            post.getComments().remove(this);
            post.getComments().add(this);
            this.post = post;
        }
    }
//    public void setUser(User user){
//        if(user != null){
//            user.getComments().remove(this);
//            user.getComments().add(this);
//            this.user = user;
//        }
//    }
//
//    public void setParentComment(Comment parentComment){
//        if(parentComment != null){
//            parentComment.getChildComments().remove(this);
//            parentComment.getChildComments().add(this);
//            this.parentComment = parentComment;
//        }
//    }
    //
}
