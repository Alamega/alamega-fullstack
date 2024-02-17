package com.alamega.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AlamegaSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlamegaSpringApplication.class, args);
    }
}