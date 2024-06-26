package com.alamega.backend.services;

import com.alamega.backend.model.post.Post;
import com.alamega.backend.model.post.PostRepository;
import com.alamega.backend.schemas.request.PostPublicationRequest;
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

    public List<Post> getPosts() {
        return postRepository.findAllByAuthorOrderByDateDesc(AuthenticationService.getCurrentUser());
    }

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

    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(UUID id) {
        postRepository.deleteById(id);
    }
}