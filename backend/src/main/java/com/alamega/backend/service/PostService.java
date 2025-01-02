package com.alamega.backend.service;

import com.alamega.backend.dto.request.PostPublicationRequest;
import com.alamega.backend.model.post.Post;
import com.alamega.backend.model.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {
    private final UserService userService;
    private final PostRepository postRepository;

    public Page<Post> getPosts(UUID userId, int page, int limit) {
        return userService.getUserById(userId)
                .map(user -> postRepository.findAllByAuthorOrderByDateDesc(user, PageRequest.of(page, limit)))
                .orElse(null);
    }

    public Optional<Post> getPostById(UUID id) {
        return postRepository.findById(id);
    }

    public Post createPost(PostPublicationRequest postPublicationRequest) {
        return postRepository.save(
                Post.builder()
                        .date(Instant.now())
                        .author(AuthenticationService.getCurrentUser())
                        .text(postPublicationRequest.getText())
                        .build()
        );
    }

    public void deletePost(UUID id) {
        postRepository.deleteById(id);
    }
}