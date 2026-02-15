package alamega.backend.model.user;

import jakarta.annotation.Nonnull;
import org.jspecify.annotations.NonNull;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Override
    @Nonnull
    @Cacheable(value = "users")
    List<User> findAll();

    @Nonnull
    Page<User> findAll(@NonNull Pageable pageable);

    @Override
    @Nonnull
    @Cacheable(value = "users_by_id", key = "#uuid")
    Optional<User> findById(UUID uuid);

    @Cacheable(value = "users_by_username", key = "#username")
    Optional<User> findByUsername(String username);
    
    boolean existsByUsername(String username);

    @Override
    @Nonnull
    @Caching(put = {
            @CachePut(value = {"users", "users_by_id"}, key = "#entity.id"),
            @CachePut(value = {"users_by_username"}, key = "#entity.username")
    })
    <S extends User> S save(S entity);

    @Override
    @Caching(evict = {
            @CacheEvict(value = {"users", "users_by_id"}, key = "#entity.id"),
            @CacheEvict(value = {"users_by_username"}, key = "#entity.username")
    })
    void delete(User entity);
}
