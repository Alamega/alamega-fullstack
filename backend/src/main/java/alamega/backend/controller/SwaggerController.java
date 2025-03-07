package alamega.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class SwaggerController {
    @GetMapping("/")
    public String index() {
        return "redirect:/swagger-ui/index.html";
    }
}
