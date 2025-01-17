package com.alamega.backend.service;

import com.alamega.backend.dto.request.AuthenticationRequest;
import com.alamega.backend.dto.request.RegisterRequest;
import com.alamega.backend.dto.response.AuthResponse;
import com.alamega.backend.exception.UnauthorizedException;
import com.alamega.backend.model.role.RoleRepository;
import com.alamega.backend.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    public static User getCurrentUser() {
        if (SecurityContextHolder.getContext().getAuthentication() == null || SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            throw new UnauthorizedException("Необходима аутентификация!");
        }
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public AuthResponse register(RegisterRequest request) throws UnauthorizedException {
        userService.getUserByUsername(request.getUsername()).ifPresent((user -> {
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
        userService.createUser(user);
        return createAuthResponse(user);
    }

    public AuthResponse authenticate(AuthenticationRequest request) throws UnauthorizedException {
        User user = userService.getUserByUsername(request.getUsername()).orElseThrow(() -> new UnauthorizedException("Пользователь не найден."));
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
                .token(jwtService.generateToken(user))
                .id(user.getId().toString())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
