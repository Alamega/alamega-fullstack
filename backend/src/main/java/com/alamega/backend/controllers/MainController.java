package com.alamega.backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @GetMapping({"/", "index", "index.html"})
    public String index() {
        return "index";
    }

    @GetMapping("/chat")
    public String chat() {
        return "chat";
    }

    @GetMapping("/knuckles")
    public String knuckles() {
        return "knuckles";
    }
}
