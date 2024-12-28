package com.alamega.backend.model.role;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    @Cacheable(value = "role")
    Role getByValue(String value);

    @CacheEvict(cacheNames = "role", allEntries = true)
    @Override
    @NonNull
    <S extends Role> S save(@NonNull S entity);


    @CacheEvict(cacheNames = "role", allEntries = true)
    @Override
    void deleteById(@NonNull UUID uuid);
}