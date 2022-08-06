package com.alamega.alamegaspringapp.controllers;

import com.alamega.alamegaspringapp.post.Post;
import com.alamega.alamegaspringapp.post.PostRepository;
import com.alamega.alamegaspringapp.user.User;
import com.alamega.alamegaspringapp.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
public class UserPageController {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    public UserPageController(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @GetMapping({"/users/{username}"})
    public String user(Model model, @PathVariable String username) {
        User pageOwner = userRepository.findByUsername(username);
        User currentUser = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (pageOwner!=null) {
            List<Post> bdPosts = postRepository.findAllByAuthor(pageOwner);
            List<Post> posts = new ArrayList<>();
            for(int i = bdPosts.size() - 1; i >=0; i--) {
                posts.add(bdPosts.get(i));
            }
            model.addAttribute("pageOwner", pageOwner);
            model.addAttribute("posts", posts.toArray());
        } else {
            //Если искомого юзера не существует
            if (currentUser!=null) {
                //И текущий юзер авторизован
                return "redirect:/users/" + currentUser.getUsername();
            } else {
                //И текущий юзер - не авторизован
                return "redirect:/login";
            }
        }
        model.addAttribute("currentUser", currentUser);
        return "user";
    }

    @PostMapping("/posts")
    public String newPost(@ModelAttribute("text") String text){
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (user!=null && text.length() <= 1024) {
            postRepository.save(new Post(user, text));
            return "redirect:/users/" + user.getUsername();
        } else {
            return "redirect:/login";
        }
    }

    @PostMapping("/posts/delete/{id}")
    public String deletePost(@PathVariable UUID id){
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent() && (user.getRole().equals("ADMIN") || user.getId().equals(post.get().getAuthor().getId()))) {
            postRepository.deleteById(id);
            return "redirect:/users/" + post.get().getAuthor().getUsername();
        } else {
            return "redirect:/login";
        }
    }
}