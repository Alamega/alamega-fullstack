package com.alamega.alamegaspringapp.model.post;

import com.alamega.alamegaspringapp.model.user.User;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    @Cacheable(value = "posts", key = "#author.id")
    List<Post> findAllByAuthorOrderByDateDesc(User author);

    @CacheEvict(cacheNames = "posts", key = "#entity.author.id")
    @Override
    @NonNull
    <S extends Post> S save(@NonNull S entity);

    //TODO Я хз как
    @CacheEvict(cacheNames = "posts", key = "#root.target.findById(#id).get().author.id", beforeInvocation = true)
    @Override
    void deleteById(@NonNull UUID id);
}