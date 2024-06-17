package com.alamega.backend.services;

import com.alamega.backend.exceptions.UnauthorizedException;
import com.alamega.backend.model.user.User;
import com.alamega.backend.schemas.request.AuthenticationRequest;
import com.alamega.backend.schemas.request.RegisterRequest;
import com.alamega.backend.schemas.response.AuthResponse;
import lombok.RequiredArgsConstructor;
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
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public static User getCurrentUser() {
        if (SecurityContextHolder.getContext().getAuthentication() == null || SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            throw new UnauthorizedException("Необходима аутентификация!");
        }
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public AuthResponse register(RegisterRequest request) throws UnauthorizedException {
        userService.getUserByUsername(request.getUsername()).ifPresent((user -> {
            //Если такой чувак уже имеется – то сразу ошибка
            throw new UnauthorizedException("Имя \"" + user.getUsername() + "\" уже занято.");
        }));
        User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()), "USER");
        userService.createUser(user);
        return AuthResponse
                .builder()
                .token(jwtService.generateToken(user))
                .id(user.getId().toString())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }

    public AuthResponse authenticate(AuthenticationRequest request) throws UnauthorizedException {
        //Если пользователь не найден
        User user = userService.getUserByUsername(request.getUsername()).orElseThrow(() -> new UnauthorizedException("Пользователь не найден."));
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Пароль не верен.");
        }
        //Если всё гуд
        return AuthResponse
                .builder()
                .token(jwtService.generateToken(user))
                .id(user.getId().toString())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
