package com.alamega.backend.controllers;

import com.alamega.backend.model.user.User;
import com.alamega.backend.schemas.request.CreateUserRequest;
import com.alamega.backend.schemas.response.ErrorResponse;
import com.alamega.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@Tag(name = "Пользователи", description = "API для управления данными пользователей")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    
    @Operation(summary = "Получение пользователя по ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = User.class),
                            mediaType = "application/json"
                    )
            }),
            @ApiResponse(responseCode = "404", content = {
                    @Content(
                            schema = @Schema(implementation = ErrorResponse.class),
                            mediaType = "application/json"
                    )
            })
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable UUID id) {
        Optional<User> user = userService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return new ResponseEntity<>(new ErrorResponse("Пользователь с таким id не найден."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Добавление нового пользователя")
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = {
                    @Content(
                            schema = @Schema(implementation = User.class),
                            mediaType = "application/json"
                    )
            }),
            @ApiResponse(responseCode = "500", content = {
                    @Content(
                            schema = @Schema(implementation = ErrorResponse.class),
                            mediaType = "application/json"
                    )
            })
    })
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest user) {
        try {
            User createdUser = new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), "USER");
            return new ResponseEntity<>(userService.createUser(createdUser), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new ErrorResponse("Не удалось создать пользователя."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Удаление пользователя по ID")
    @ApiResponses({
            @ApiResponse(responseCode = "204", content = @Content),
            @ApiResponse(responseCode = "404", content = {
                    @Content(
                            schema = @Schema(implementation = ErrorResponse.class),
                            mediaType = "application/json"
                    )
            })
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
