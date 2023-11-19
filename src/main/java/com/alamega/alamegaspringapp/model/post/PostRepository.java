package com.alamega.alamegaspringapp.model.post;

import com.alamega.alamegaspringapp.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findAllByAuthorOrderByDateDesc(User authorId);
}