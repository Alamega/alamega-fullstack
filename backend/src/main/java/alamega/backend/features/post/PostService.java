package alamega.backend.features.post;

import alamega.backend.features.auth.AuthService;
import alamega.backend.features.post.dto.PostPublicationRequest;
import alamega.backend.features.post.model.Post;
import alamega.backend.features.post.repository.PostRepository;
import alamega.backend.features.user.UserService;
import alamega.backend.features.user.model.User;
import alamega.backend.infrastructure.exception.PostNotFoundException;
import alamega.backend.infrastructure.exception.UnauthorizedException;
import alamega.backend.infrastructure.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final AuthService authService;
    private final UserService userService;
    private final PostRepository postRepository;

    public Page<Post> getAllByPage(String userId, Pageable pageable) {
        return userService.findById(userId)
                .map(user -> postRepository.findAllByAuthorOrderByDateDesc(user, pageable))
                .orElse(Page.empty());
    }

    public Optional<Post> getPostById(String id) {
        try {
            UUID uuid = UUID.fromString(id);
            return postRepository.findById(uuid);
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    @Transactional
    public Post createPost(PostPublicationRequest postPublicationRequest) {
        UserPrincipal currentUser = authService.getCurrentUser();
        User userEntity = userService.findById(currentUser.id().toString()).orElseThrow(() -> new UnauthorizedException("Пользователь не найден в системе."));
        return postRepository.save(
                Post.builder()
                        .date(Instant.now())
                        .author(userEntity)
                        .text(postPublicationRequest.getText())
                        .build()
        );
    }

    @Transactional
    public void deletePost(String id) {
        UUID uuid = UUID.fromString(id);
        Post post = postRepository.findById(uuid).orElseThrow(() -> new PostNotFoundException("Пост не найден."));
        UserPrincipal currentUser = authService.getCurrentUser();
        boolean isAuthor = post.getAuthor().getId().equals(currentUser.id());
        boolean isAdmin = currentUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if (!isAuthor && !isAdmin) {
            throw new AccessDeniedException("Это не ваш пост и вы мне тут не админ!");
        }
        postRepository.delete(post);
    }
}