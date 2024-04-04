package com.alamega.backend.controllers;

import com.alamega.backend.exceptions.UnauthorizedException;
import com.alamega.backend.schemas.request.AuthenticationRequest;
import com.alamega.backend.schemas.request.RegisterRequest;
import com.alamega.backend.schemas.response.AuthResponse;
import com.alamega.backend.schemas.response.ErrorResponse;
import com.alamega.backend.services.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Tag(name = "Аутентификация", description = "API для управления получения токена доступа и данных пользователя")
@RestController
@RequestMapping(value = "/auth", produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthenticationController {
    final AuthenticationService authenticationService;

    @Operation(summary = "Регистрация нового пользователя")
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse register(@RequestBody RegisterRequest request) throws UnauthorizedException {
        return authenticationService.register(request);
    }

    @Operation(summary = "Аутентификация пользователя")
    @PostMapping("/authenticate")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse authenticate(@RequestBody AuthenticationRequest request) throws UnauthorizedException {
        return authenticationService.authenticate(request);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse authenticate(UnauthorizedException exception) {
        return new ErrorResponse(exception.getMessage());
    }
}