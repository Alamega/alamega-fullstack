package com.alamega.alamegaspringapp.controllers;

import com.alamega.alamegaspringapp.post.Post;
import com.alamega.alamegaspringapp.post.PostRepository;
import com.alamega.alamegaspringapp.user.User;
import com.alamega.alamegaspringapp.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("users")
public class UserController {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    public UserController(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @GetMapping({"/{username}"})
    public String user(Model model, @PathVariable String username) {
        User user = userRepository.findByUsername(username);
        if (user!=null){
            model.addAttribute("user", user);
            model.addAttribute("currentUser", userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
            List<Post> bdPosts = postRepository.findAllByAuthor(user);
            List<Post> posts = new ArrayList<>();
            for(int i = bdPosts.size() - 1; i >=0; i--) {
                posts.add(bdPosts.get(i));
            }
            model.addAttribute("posts", posts.toArray());
            return "user";
        }
        return "error/404";
    }
}
