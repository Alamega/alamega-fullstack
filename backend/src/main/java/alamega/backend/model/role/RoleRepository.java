package alamega.backend.model.role;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    @Cacheable(value = "roles")
    Optional<Role> findByValue(@NonNull String value);

    @Cacheable(value = "roles")
    @Override
    @NonNull
    Optional<Role> findById(@NonNull UUID uuid);

    @CacheEvict(cacheNames = "roles", allEntries = true)
    @Override
    @NonNull
    <S extends Role> S save(@NonNull S entity);

    @CacheEvict(cacheNames = "roles", allEntries = true)
    @Override
    void deleteById(@NonNull UUID uuid);
}