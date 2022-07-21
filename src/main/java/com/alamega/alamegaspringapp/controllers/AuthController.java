package com.alamega.alamegaspringapp.controllers;

import com.alamega.alamegaspringapp.user.User;
import com.alamega.alamegaspringapp.user.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class AuthController {
    private final UserRepository userRepository;
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String login() {
        return "auth/login";
    }

    @GetMapping("/registration")
    public String registration() {
        return "auth/registration";
    }

    @PostMapping("/registration")
    public String addUser(Model model, @ModelAttribute("username") String username, @ModelAttribute("password") String password) {
        List<String> errors = new ArrayList<>();

        //Гениальная валидация
        if (userRepository.findByUsername(username) != null){
            errors.add("Пользователь с таким никнеймом уже существует!");
        }
        if (username.length()<4){
            errors.add("Имя пользователя должно быть длиннее 4 символов!");
        }
        if (password.length()<8){
            errors.add("Пароль должно быть длиннее 8 символов!");
        }

        //Если ошибок нету
        if (errors.isEmpty()){
            User user = new User();
            user.setUsername(username);
            user.setPassword(new BCryptPasswordEncoder().encode(password));
            user.setRole("USER");
            user.setEnabled(true);
            userRepository.save(user);
            model.addAttribute("result", "Регистрация прошла успешно!");
        }

        model.addAttribute("errors", errors);
        return "auth/registration";
    }
}
