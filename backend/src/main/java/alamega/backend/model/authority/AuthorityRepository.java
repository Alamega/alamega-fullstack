package alamega.backend.model.authority;

import jakarta.annotation.Nonnull;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthorityRepository extends JpaRepository<Authority, UUID> {
    @Cacheable(value = "authorities", key = "#uuid")
    @Override
    @Nonnull
    Optional<Authority> findById(UUID uuid);

    @CachePut(cacheNames = "authorities", key = "#entity.id")
    @Override
    @Nonnull
    <S extends Authority> S save(S entity);

    @CacheEvict(cacheNames = "authorities", key = "#uuid")
    @Override
    void deleteById(UUID uuid);
}