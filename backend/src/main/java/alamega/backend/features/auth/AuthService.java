package alamega.backend.features.auth;

import alamega.backend.features.auth.dto.AuthRequest;
import alamega.backend.features.auth.dto.AuthResponse;
import alamega.backend.features.auth.dto.RegisterRequest;
import alamega.backend.features.user.UserService;
import alamega.backend.features.user.model.User;
import alamega.backend.infrastructure.exception.UnauthorizedException;
import alamega.backend.infrastructure.exception.UserAlreadyExistsException;
import alamega.backend.infrastructure.security.JwtService;
import alamega.backend.infrastructure.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("Имя \"" + request.getUsername() + "\" уже занято.");
        }
        User user = userService.createSimpleUser(request.getUsername(), request.getPassword());
        return createAuthResponse(userService.save(user));
    }

    public AuthResponse authenticate(AuthRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            User user = userService.findByUsername(request.getUsername()).orElseThrow(() -> new UnauthorizedException("Неверный логин или пароль."));
            return createAuthResponse(user);
        } catch (BadCredentialsException e) {
            throw new UnauthorizedException("Неверный логин или пароль.");
        }
    }

    private AuthResponse createAuthResponse(User user) {
        UserPrincipal principal = UserPrincipal.create(user);
        return AuthResponse.builder()
                .token(jwtService.generateToken(principal))
                .id(user.getId().toString())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}