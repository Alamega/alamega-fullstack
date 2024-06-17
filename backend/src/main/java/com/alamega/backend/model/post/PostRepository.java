package com.alamega.backend.model.post;

import com.alamega.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findAllByAuthorOrderByDateDesc(User author);

    @Override
    @NonNull
    <S extends Post> S save(@NonNull S entity);

    @Override
    void deleteById(@NonNull UUID id);
}