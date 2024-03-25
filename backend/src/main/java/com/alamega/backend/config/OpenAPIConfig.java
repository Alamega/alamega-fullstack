package com.alamega.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI getOpenAPI() {
        Contact contact = new Contact();
        contact.setEmail("vladshuman@gmail.com");
        contact.setName("Alamega");
        contact.setUrl("https://alamega.github.io");

        Info info = new Info()
                .title("API для сайта")
                .version("1.0")
                .contact(contact)
                .description("API предназначено для осуществления работы сайта https://alamega.onrender.com.");
        return new OpenAPI().info(info);
    }
}