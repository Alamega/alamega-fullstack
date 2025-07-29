package alamega.backend.service;

import alamega.backend.dto.request.AuthenticationRequest;
import alamega.backend.dto.request.RegisterRequest;
import alamega.backend.dto.response.AuthResponse;
import alamega.backend.exception.UnauthorizedException;
import alamega.backend.model.role.RoleRepository;
import alamega.backend.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${admin.username}")
    private String adminUsername;

    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null
                || !auth.isAuthenticated()
                || !(auth.getPrincipal() instanceof User)) {
            throw new UnauthorizedException("Необходима аутентификация!");
        }
        return (User) auth.getPrincipal();
    }

    public AuthResponse register(RegisterRequest request) throws UnauthorizedException {
        userService.findByUsername(request.getUsername()).ifPresent((user -> {
            throw new UnauthorizedException("Имя \"" + user.getUsername() + "\" уже занято.");
        }));
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(adminUsername.equals(request.getUsername())
                        ? roleRepository.findByValue("ADMIN").orElseThrow(() -> new RuntimeException("Роль ADMIN не найдена"))
                        : roleRepository.findByValue("USER").orElseThrow(() -> new RuntimeException("Роль USER не найдена"))
                )
                .build();
        return createAuthResponse(userService.save(user));
    }

    public AuthResponse authenticate(AuthenticationRequest request) throws UnauthorizedException {
        User user = userService.findByUsername(request.getUsername())
                .orElseThrow(() -> new UnauthorizedException("Пользователь не найден."));
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Пароль не верен.");
        }
        return createAuthResponse(user);
    }

    private AuthResponse createAuthResponse(User user) {
        return AuthResponse.builder()
                .token(jwtService.generateToken(userService.loadUserByUsername(user.getUsername())))
                .id(user.getId().toString())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
