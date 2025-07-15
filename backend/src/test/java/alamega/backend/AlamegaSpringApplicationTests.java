package alamega.backend;

import alamega.backend.controller.AuthenticationController;
import alamega.backend.dto.request.AuthenticationRequest;
import alamega.backend.dto.request.RegisterRequest;
import alamega.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestcontainersConfiguration.class)
class AlamegaSpringApplicationTests {
    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private UserService userService;

    @Value("${admin.username}")
    private String adminUsername;

    @Test
    void contextLoads() {
    }

    @Test
    void testAuthenticationFlow() {
        // 1) Попытка входа несуществующего пользователя
        assertThrows(Exception.class, () ->
                authenticationController.authenticate(
                        AuthenticationRequest.builder()
                                .username("user")
                                .password("1111")
                                .build()
                )
        );

        // 2) Регистрация простого пользователя
        authenticationController.register(
                RegisterRequest.builder()
                        .username("user")
                        .password("1111")
                        .build()
        );
        assertEquals(1, userService.count());
        assertEquals(
                "USER",
                authenticationController.authenticate(
                        AuthenticationRequest.builder()
                                .username("user")
                                .password("1111")
                                .build()
                ).getRole().getValue()
        );

        // 3) Регистрация администратора
        authenticationController.register(
                RegisterRequest.builder()
                        .username(adminUsername)
                        .password("1111")
                        .build()
        );
        assertEquals(2, userService.count());
        assertEquals(
                "ADMIN",
                authenticationController.authenticate(
                        AuthenticationRequest.builder()
                                .username(adminUsername)
                                .password("1111")
                                .build()
                ).getRole().getValue()
        );

        // 4) Попытка дублированной регистрации
        assertThrows(Exception.class, () ->
                authenticationController.register(
                        RegisterRequest.builder()
                                .username("user")
                                .password("2222")
                                .build()
                )
        );
    }
}