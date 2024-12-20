package com.alamega.backend.controllers;

import com.alamega.backend.model.post.Post;
import com.alamega.backend.schemas.request.PostPublicationRequest;
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
@RequestMapping(produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @Operation(summary = "Получение всех постов")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Post> getAll() {
        return postService.getPosts();
    }

    @Operation(summary = "Получение всех постов по id пользователя")
    @GetMapping("users/{userId}/posts")
    @ResponseStatus(HttpStatus.OK)
    public List<Post> getByUserId(@PathVariable("userId") String userId) {
        return postService.getPosts(userId);
    }

    @Operation(summary = "Добавление нового поста")
    @PostMapping("/posts")
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@RequestBody PostPublicationRequest post) {
        return postService.createPost(post);
    }

    @Operation(summary = "Получение поста по ID")
    @GetMapping("/posts/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Post getPostById(@PathVariable UUID id) {
        Optional<Post> post = postService.getPostById(id);
        if (post.isPresent()) {
            return post.get();
        } else {
            throw new RuntimeException("Пост с таким id не найден.");
        }
    }

    @Operation(summary = "Удаление поста по ID")
    @DeleteMapping("/posts/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
    }
}
