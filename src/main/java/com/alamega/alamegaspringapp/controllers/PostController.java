package com.alamega.alamegaspringapp.controllers;

import com.alamega.alamegaspringapp.post.Post;
import com.alamega.alamegaspringapp.post.PostRepository;
import com.alamega.alamegaspringapp.user.User;
import com.alamega.alamegaspringapp.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping("posts")
public class PostController {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public PostController(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public String newPost(@ModelAttribute("text") String text){
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (user!=null) {
            postRepository.save(new Post(user, text));
            return "redirect:/users/"+user.getUsername();
        }
        return "index";
    }

    @PostMapping("/delete/{id}")
    public String deletePost(@PathVariable UUID id){
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent() && (user.getRole().equals("ADMIN") || user.getId().equals(post.get().getAuthor().getId()))) {
            postRepository.deleteById(id);
            return "redirect:/users/" + post.get().getAuthor().getUsername();
        }
        return "redirect:/";
    }
}
