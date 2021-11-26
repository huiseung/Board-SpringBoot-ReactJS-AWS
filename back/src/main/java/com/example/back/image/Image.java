package com.example.back.image;


import com.example.back.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name="images")
@Getter
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Image {
    @Column(name="image_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //
    @JoinColumn(name="post_id")
    @ManyToOne
    private Post post;
    //
    @Column
    private String fileName;
    @Column
    private String storagePath;
    //
    public void setPost(Post post){
        if(post != null){
            post.getImages().remove(this);
            post.getImages().add(this);
        }
        this.post = post;
    }
}
