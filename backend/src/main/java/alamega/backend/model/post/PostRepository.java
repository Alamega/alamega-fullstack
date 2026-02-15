package alamega.backend.model.post;

import alamega.backend.model.user.User;
import jakarta.annotation.Nonnull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    Page<Post> findAllByAuthorOrderByDateDesc(User author, Pageable pageable);

    @Override
    @Nonnull
    <S extends Post> S save(S entity);

    @Override
    void deleteById(UUID postId);
}