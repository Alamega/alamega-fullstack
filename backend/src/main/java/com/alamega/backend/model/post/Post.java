package com.alamega.backend.model.post;

import com.alamega.backend.model.user.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Data
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

    public Post() {
    }

    public Post(User author, String text) {
        this.author = author;
        this.text = text;
    }

    public Calendar getDate() {
        return new Calendar.Builder().setInstant(date).build();
    }
}