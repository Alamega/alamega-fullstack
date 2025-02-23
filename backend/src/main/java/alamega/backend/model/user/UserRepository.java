package alamega.backend.model.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    //@Cacheable(value = "users_by_username", key = "#username", unless = "#result==null")
    Optional<User> findByUsername(String username);

    //@Cacheable(value = "users_by_id", key = "#id", unless = "#result==null")
    @Override
    @NonNull
    Optional<User> findById(@NonNull UUID id);

    //@CachePut(cacheNames = {"users_by_id", "users_by_username"}, key = "#entity.id")
    @Override
    @NonNull
    <S extends User> S save(@NonNull S entity);

    //@CacheEvict(cacheNames = {"users_by_id", "users_by_username"}, key = "#uuid")
    @Override
    void deleteById(@NonNull UUID uuid);
}