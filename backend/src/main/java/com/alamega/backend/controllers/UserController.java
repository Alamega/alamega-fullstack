package com.alamega.backend.controllers;

import com.alamega.backend.model.user.User;
import com.alamega.backend.schemas.request.CreateUserRequest;
import com.alamega.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Tag(name = "Пользователи", description = "API для управления данными пользователей")
@RestController
@RequestMapping(value = "/users", produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "Получение всех пользователей")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<User> getAll() {
        return userService.getUsers();
    }

    @Operation(summary = "Добавление нового пользователя")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody CreateUserRequest user) {
        return userService.createUser(new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), "USER"));
    }

    @Operation(summary = "Получение пользователя по ID")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserById(@PathVariable UUID id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new RuntimeException("Пользователь с таким id не найден.");
        }
    }

    @Operation(summary = "Удаление пользователя по ID")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
    }
}
