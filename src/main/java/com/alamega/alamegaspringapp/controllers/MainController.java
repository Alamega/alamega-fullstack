package com.alamega.alamegaspringapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {
//    @GetMapping("/")
//    public String index(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
//        model.addAttribute("name", name);
//        return "index";
//    }
    @GetMapping("/")
    public String index() { return "index"; }

    @GetMapping("/login")
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
