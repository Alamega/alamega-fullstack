package alamega.backend.features.post;

import alamega.backend.features.post.dto.PostPublicationRequest;
import alamega.backend.features.post.model.Post;
import alamega.backend.infrastructure.exception.PostNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Tag(name = "Посты", description = "API для управления данными постов пользователей")
@RestController
@RequestMapping(produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @Operation(summary = "Получение постов по id пользователя (страница)")
    @GetMapping("users/{userId}/posts")
    @ResponseStatus(HttpStatus.OK)
    public Page<Post> getPosts(
            @PathVariable String userId,
            @RequestParam Integer page,
            @RequestParam Integer size
    ) {
        return postService.getAllByPage(userId, PageRequest.of(page, size));
    }

    @Operation(summary = "Добавление нового поста")
    @PostMapping("/posts")
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@Valid @RequestBody PostPublicationRequest post) {
        return postService.createPost(post);
    }

    @Operation(summary = "Получение поста по ID")
    @GetMapping("/posts/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Post getPostById(@PathVariable String id) {
        return postService.getPostById(id).orElseThrow(() -> new PostNotFoundException("Пост с ID " + id + " не найден."));
    }

    @Operation(summary = "Удаление поста по ID")
    @DeleteMapping("/posts/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("isAuthenticated()")
    public void deletePost(@PathVariable String id) {
        postService.deletePost(id);
    }
}
