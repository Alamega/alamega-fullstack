package com.alamega.alamegaspringapp.controllers;

import com.alamega.alamegaspringapp.user.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RESTController {
    final UserRepository userRepository;
    public RESTController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public String api() {
        return "Тестовая строчечка";
    }

    @GetMapping("/test")
    public List<String> test() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignored) {}
        List<String> list = new ArrayList<>();
        list.add("Строка 3");
        list.add("Строка 2");
        list.add("Строка 1");
        return list;
    }
}
