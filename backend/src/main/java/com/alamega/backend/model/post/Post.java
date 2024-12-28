package com.alamega.backend.model.post;

import com.alamega.backend.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "post")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "author")
    private User author;

    @Column(length = 1024)
    private String text;

    @CreatedDate
    private Date date = new Date();

    public Post(User author, String text) {
        this.author = author;
        this.text = text;
    }
}