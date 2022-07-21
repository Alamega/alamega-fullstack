package com.alamega.alamegaspringapp.user;

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
        User userByDB = userRepository.findByUsername(username);
        if (userByDB!=null){
            model.addAttribute("user", userByDB);
            return "user";
        }
        return "error/404";
    }
}
