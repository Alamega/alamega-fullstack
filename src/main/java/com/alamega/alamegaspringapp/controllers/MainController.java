package com.alamega.alamegaspringapp.controllers;

import com.alamega.alamegaspringapp.user.User;
import com.alamega.alamegaspringapp.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    private final UserRepository userRepository;
    public MainController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping({"/", "index", "index.html"})
    public String index(Model model) {
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (user!=null && user.getUsername().equals("Alamega") && !user.getRole().equals("ADMIN")){
            user.setRole("ADMIN");
            userRepository.save(user);
        }
        if (user!=null){
            model.addAttribute("user", user);
        }
        return "index";
    }

    @GetMapping("/user")
    public String user() {
        return "user";
    }

    @GetMapping("/game")
    public String game() {
        return "game";
    }

    @GetMapping("/test")
    public String test() {
        return "template";
    }
}
