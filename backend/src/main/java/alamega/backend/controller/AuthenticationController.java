package alamega.backend.controller;

import alamega.backend.dto.request.AuthenticationRequest;
import alamega.backend.dto.request.RegisterRequest;
import alamega.backend.dto.response.AuthResponse;
import alamega.backend.exception.UnauthorizedException;
import alamega.backend.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) throws UnauthorizedException {
        return authenticationService.register(request);
    }

    @Operation(summary = "Аутентификация пользователя")
    @PostMapping("/authenticate")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse authenticate(@RequestBody AuthenticationRequest request) throws UnauthorizedException {
        return authenticationService.authenticate(request);
    }
}