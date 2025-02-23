package alamega.backend.model.post;

import alamega.backend.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    Page<Post> findAllByAuthorOrderByDateDesc(User author, Pageable pageable);

    @Override
    @NonNull
    <S extends Post> S save(@NonNull S entity);

    @Override
    void deleteById(@NonNull UUID postId);
}