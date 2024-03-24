package com.alamega.backend.services;

import com.alamega.backend.model.api.request.AuthenticationRequest;
import com.alamega.backend.model.api.request.RegisterRequest;
import com.alamega.backend.model.api.response.AuthenticationResponse;
import com.alamega.backend.model.user.User;
import com.alamega.backend.model.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        //Если такой чувак уже имеется – то сразу ошибка
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Имя пользователя занято.");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();
        userRepository.save(user);
        return AuthenticationResponse.builder()
                .token(jwtService.generateToken(user))
                .id(user.getId().toString())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        //Если пользователь не найден
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(
                () -> new RuntimeException("Пользователь не найден.")
        );

        //Если пароль не верен
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (RuntimeException e) {
            throw new RuntimeException("Пароль не верен.");
        }

        //Если всё гуд
        return AuthenticationResponse.builder()
                .token(jwtService.generateToken(user))
                .id(user.getId().toString())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
