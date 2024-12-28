package com.alamega.backend.service;

import com.alamega.backend.dto.request.PostPublicationRequest;
import com.alamega.backend.model.post.Post;
import com.alamega.backend.model.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {
    private final UserService userService;
    private final PostRepository postRepository;

    public List<Post> getPosts(String userId) {
        return userService.getUserById(UUID.fromString(userId)).map(postRepository::findAllByAuthorOrderByDateDesc).orElse(null);
    }

    public Optional<Post> getPostById(UUID id) {
        return postRepository.findById(id);
    }

    public Post createPost(PostPublicationRequest postPublicationRequest) {
        return postRepository.save(
                new Post(
                        AuthenticationService.getCurrentUser(),
                        postPublicationRequest.getText()
                )
        );
    }

    public void deletePost(UUID id) {
        postRepository.deleteById(id);
    }
}