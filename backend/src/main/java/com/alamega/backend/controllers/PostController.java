package com.alamega.backend.controllers;

import com.alamega.backend.model.post.Post;
import com.alamega.backend.schemas.request.PostPublicationRequest;
import com.alamega.backend.schemas.response.ErrorResponse;
import com.alamega.backend.services.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Tag(name = "Посты", description = "API для управления данными постов пользователей")
@RestController
@RequestMapping(value = "/posts", produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @Operation(summary = "Получение всех постов")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Post> getAll() {
        return postService.getPosts();
    }

    @Operation(summary = "Добавление нового поста")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@RequestBody PostPublicationRequest post) {
        return postService.createPost(post);
    }

    @Operation(summary = "Получение поста по ID")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Post getUserById(@PathVariable UUID id) {
        Optional<Post> post = postService.getPostById(id);
        if (post.isPresent()) {
            return post.get();
        } else {
            throw new RuntimeException("Пост с таким id не найден.");
        }
    }

    @Operation(summary = "Удаление поста по ID")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse errorResponse(RuntimeException exception) {
        return new ErrorResponse(exception.getMessage());
    }
}
