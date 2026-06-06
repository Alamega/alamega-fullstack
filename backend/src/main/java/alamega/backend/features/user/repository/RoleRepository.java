package alamega.backend.features.user.repository;

import alamega.backend.features.user.model.Role;
import jakarta.annotation.Nonnull;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    @Cacheable(value = "roles")
    Optional<Role> findByValue(String val);

    @Cacheable(value = "roles")
    @Override
    @Nonnull
    Optional<Role> findById(@Nonnull UUID uuid);

    @CacheEvict(cacheNames = "roles", allEntries = true)
    @Override
    @Nonnull
    <S extends Role> S save(@Nonnull S entity);

    @CacheEvict(cacheNames = "roles", allEntries = true)
    @Override
    void deleteById(@Nonnull UUID uuid);
}