package alamega.backend.service;

import alamega.backend.dto.request.PostPublicationRequest;
import alamega.backend.model.post.Post;
import alamega.backend.model.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final PostRepository postRepository;

    public Page<Post> getAllByPage(String userId, Pageable pageable) {
        return userService.findById(userId)
                .map(user -> postRepository.findAllByAuthorOrderByDateDesc(user, pageable))
                .orElse(null);
    }

    public Optional<Post> getPostById(String id) {
        UUID uuid = UUID.fromString(id);
        return postRepository.findById(uuid);
    }

    public Post createPost(PostPublicationRequest postPublicationRequest) {
        return postRepository.save(
                Post.builder()
                        .date(Instant.now())
                        .author(authenticationService.getCurrentUser())
                        .text(postPublicationRequest.getText())
                        .build()
        );
    }

    public void deletePost(String id) {
        UUID uuid = UUID.fromString(id);
        Post post = postRepository.findById(uuid).orElseThrow(() -> new RuntimeException("Пост не найден."));
        var currentUser = authenticationService.getCurrentUser();
        if (!post.getAuthor().getId().equals(currentUser.getId()) && !currentUser.getRole().getValue().equals("ADMIN")) {
            throw new RuntimeException("Это не ваш пост и вы мне тут не админ!");
        }
        postRepository.delete(post);
    }
}