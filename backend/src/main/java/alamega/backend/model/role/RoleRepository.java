package alamega.backend.model.role;

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
    Optional<Role> findById(UUID uuid);

    @CacheEvict(cacheNames = "roles", allEntries = true)
    @Override
    @Nonnull
    <S extends Role> S save(S entity);

    @CacheEvict(cacheNames = "roles", allEntries = true)
    @Override
    void deleteById(UUID uuid);
}