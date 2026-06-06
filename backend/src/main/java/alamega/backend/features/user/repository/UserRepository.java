package alamega.backend.features.user.repository;

import alamega.backend.features.user.model.User;
import jakarta.annotation.Nonnull;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Nonnull
    Page<User> findAll(@NonNull Pageable pageable);

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
