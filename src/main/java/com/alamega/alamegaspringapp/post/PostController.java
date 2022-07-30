package com.alamega.alamegaspringapp.post;

import com.alamega.alamegaspringapp.user.User;
import com.alamega.alamegaspringapp.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public String newPost(@ModelAttribute("title") String title, @ModelAttribute("text") String text){
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (user!=null) {
            postRepository.save(new Post(user, title, text));
            return "redirect:/users/"+user.getUsername();
        }
        return "index";
    }
}
