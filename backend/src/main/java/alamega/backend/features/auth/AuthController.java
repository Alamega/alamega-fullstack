package alamega.backend.features.auth;

import alamega.backend.features.auth.dto.AuthRequest;
import alamega.backend.features.auth.dto.AuthResponse;
import alamega.backend.features.auth.dto.RegisterRequest;
import alamega.backend.infrastructure.exception.UnauthorizedException;
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
public class AuthController {
    final AuthService authService;

    @Operation(summary = "Регистрация нового пользователя")
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) throws UnauthorizedException {
        return authService.register(request);
    }

    @Operation(summary = "Аутентификация пользователя")
    @PostMapping("/authenticate")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse authenticate(@RequestBody AuthRequest request) throws UnauthorizedException {
        return authService.authenticate(request);
    }
}