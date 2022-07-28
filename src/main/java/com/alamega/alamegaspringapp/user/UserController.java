package com.alamega.alamegaspringapp.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("users")
public class UserController {
    private final UserRepository userRepository;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping({"/{username}"})
    public String user(Model model, @PathVariable String username) {
        User user = userRepository.findByUsername(username);
        User currentUser = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (user!=null){
            model.addAttribute("user", user);
            model.addAttribute("currentUser", currentUser);
            return "user";
        }
        return "error/404";
    }
}
