package com.alamega.alamegaspringapp.model.user;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Cacheable(value = "users")
    User findByUsername(String username);

    @CacheEvict(cacheNames = "users", allEntries = true)
    @Override
    @NonNull
    <S extends User> S save(@NonNull S entity);


    @CacheEvict(cacheNames = "users", allEntries = true)
    @Override
    void deleteById(@NonNull UUID uuid);
}