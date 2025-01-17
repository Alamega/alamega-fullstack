package com.alamega.backend.model.authority;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;
import java.util.UUID;

public interface AuthorityRepository extends JpaRepository<Authority, UUID> {
    @Cacheable(value = "role", key = "#value")
    Optional<Authority> findByValue(String value);

    @CachePut(cacheNames = "role", key = "#entity.id")
    @Override
    @NonNull
    <S extends Authority> S save(@NonNull S entity);

    @CacheEvict(cacheNames = "role", allEntries = true)
    @Override
    void deleteById(@NonNull UUID uuid);
}