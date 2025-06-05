package alamega.backend.model.user;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Override
    @NonNull
    @Cacheable(value = "users")
    List<User> findAll();

    @NonNull
    Page<User> findAll(@NonNull Pageable pageable);

    @Override
    @NonNull
    @Cacheable(value = "users_by_id", key = "#uuid")
    Optional<User> findById(@NonNull UUID uuid);

    @Cacheable(value = "users_by_username", key = "#username")
    Optional<User> findByUsername(String username);

    @Override
    @NonNull
    @Caching(put = {
            @CachePut(value = {"users", "users_by_id"}, key = "#entity.id"),
            @CachePut(value = {"users_by_username"}, key = "#entity.username")
    })
    <S extends User> S save(@NonNull S entity);

    @Override
    @NonNull
    @Caching(evict = {
            @CacheEvict(value = {"users", "users_by_id"}, key = "#entity.id"),
            @CacheEvict(value = {"users_by_username"}, key = "#entity.username")
    })
    void delete(@NonNull User entity);
}
