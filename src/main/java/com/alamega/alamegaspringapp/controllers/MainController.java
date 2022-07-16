package com.alamega.alamegaspringapp.controllers;

import com.alamega.alamegaspringapp.user.User;
import com.alamega.alamegaspringapp.user.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    private final UserRepository userRepository;

    public MainController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        User userFromDb = userRepository.findByUsername("Alamega");
        if (userFromDb!=null){
            model.addAttribute("user", userFromDb);
        } else {
            model.addAttribute("user", new User());
        }
        return "index";
    }

    @GetMapping("/login.html")
    public String login() {
        return "login";
    }

    @GetMapping("/game.html")
    public String game() {
        return "game";
    }

    @GetMapping("/admin.html")
    public String admin() {
        return "admin";
    }

    @GetMapping("/user.html")
    public String user() {
        return "user";
    }
}
