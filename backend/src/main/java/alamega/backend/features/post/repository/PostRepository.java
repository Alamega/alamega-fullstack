package alamega.backend.features.post.repository;

import alamega.backend.features.post.model.Post;
import alamega.backend.features.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    @EntityGraph(attributePaths = "author")
    Page<Post> findAllByAuthorOrderByDateDesc(User author, Pageable pageable);
}