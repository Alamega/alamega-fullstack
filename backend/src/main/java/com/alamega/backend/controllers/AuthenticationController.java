package com.alamega.backend.controllers;

import com.alamega.backend.schemas.request.AuthenticationRequest;
import com.alamega.backend.schemas.request.RegisterRequest;
import com.alamega.backend.schemas.response.AuthResponse;
import com.alamega.backend.schemas.response.ErrorResponse;
import com.alamega.backend.services.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Аутентификация", description = "API для управления получения токена доступа и данных пользователя")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    final AuthenticationService authenticationService;

    @Operation(summary = "Регистрация нового пользователя")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = AuthResponse.class),
                            mediaType = "application/json"
                    )
            }),
            @ApiResponse(responseCode = "401", content = {
                    @Content(
                            schema = @Schema(implementation = AuthResponse.class),
                            mediaType = "application/json"
                    )
            })
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.register(request));
        } catch (RuntimeException error) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(error.getMessage()));
        }
    }

    @Operation(summary = "Аутентификация пользователя")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(
                            schema = @Schema(implementation = AuthResponse.class),
                            mediaType = "application/json"
                    )
            }),
            @ApiResponse(responseCode = "401", content = {
                    @Content(
                            schema = @Schema(implementation = AuthResponse.class),
                            mediaType = "application/json"
                    )
            })
    })
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.authenticate(request));
        } catch (RuntimeException error) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(error.getMessage()));
        }
    }
}