package com.alamega.backend.model.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    //@Cacheable(value = "users", key = "#username")
    Optional<User> findByUsername(String username);

    //@Cacheable(value = "users", key = "#id")
    @Override
    @NonNull
    Optional<User> findById(@NonNull UUID id);

    //@CachePut(cacheNames = "users", key = "#entity.id")
    @Override
    @NonNull
    <S extends User> S save(@NonNull S entity);

    //@CacheEvict(cacheNames = "users", key = "#uuid")
    @Override
    void deleteById(@NonNull UUID uuid);
}