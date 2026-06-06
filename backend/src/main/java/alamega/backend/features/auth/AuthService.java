package alamega.backend.features.auth;

import alamega.backend.features.auth.dto.AuthRequest;
import alamega.backend.features.auth.dto.AuthResponse;
import alamega.backend.features.auth.dto.RegisterRequest;
import alamega.backend.features.user.UserService;
import alamega.backend.features.user.model.Role;
import alamega.backend.features.user.model.User;
import alamega.backend.features.user.repository.RoleRepository;
import alamega.backend.infrastructure.exception.RoleNotFoundException;
import alamega.backend.infrastructure.exception.UnauthorizedException;
import alamega.backend.infrastructure.exception.UserAlreadyExistsException;
import alamega.backend.infrastructure.security.JwtService;
import alamega.backend.infrastructure.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserPrincipal getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserPrincipal principal) {
            return principal;
        }
        throw new UnauthorizedException("Необходима аутентификация!");
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("Имя \"" + request.getUsername() + "\" уже занято.");
        }
        Role role = roleRepository.findByValue("USER").orElseThrow(() -> new RoleNotFoundException("Роль USER не найдена в системе."));
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
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
