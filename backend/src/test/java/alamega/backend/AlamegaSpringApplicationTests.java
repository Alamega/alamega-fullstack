package alamega.backend;

import alamega.backend.controller.AuthenticationController;
import alamega.backend.dto.request.AuthenticationRequest;
import alamega.backend.dto.request.RegisterRequest;
import alamega.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
class AlamegaSpringApplicationTests {
    @Container
    public static PostgreSQLContainer<?> postgresContainer =
            new PostgreSQLContainer<>("postgres:latest")
                    .withDatabaseName("testdb")
                    .withUsername("testuser")
                    .withPassword("testpass");

    @DynamicPropertySource
    static void registerPgProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgresContainer::getJdbcUrl);
        registry.add("spring.datasource.username", postgresContainer::getUsername);
        registry.add("spring.datasource.password", postgresContainer::getPassword);
    }

    @Autowired
    private AuthenticationController authenticationController;
    @Autowired
    private UserService userService;
    @Value("${admin.username}")
    private String adminUsername;

    @Test
    public void testAuthenticationController() {
        //Если юзера нету - исключение
        assertThrows(Exception.class, () -> authenticationController.authenticate(
                AuthenticationRequest.builder().username("user").password("1111").build()
        ), "Ожидаем, что незарегистрированный пользователь не сможет войти");

        //Регистрация добавляет юзера c обычной ролью
        authenticationController.register(RegisterRequest.builder().username("user").password("1111").build());
        assertEquals(1, userService.count(), "Ожидаем, что создан один пользователь");
        assertEquals(
                "USER",
                authenticationController.authenticate(AuthenticationRequest.builder().username("user").password("1111").build()).getRole().getValue(),
                "Ожидаем, что роль простого юзера имеет вэлью USER"
        );

        //Регистрация админа добавляет юзера c ролью админа
        authenticationController.register(RegisterRequest.builder().username(adminUsername).password("1111").build());
        assertEquals(2, userService.count(), "Ожидаем, что создан один пользователь и один админ");
        assertEquals(
                "ADMIN",
                authenticationController.authenticate(AuthenticationRequest.builder().username(adminUsername).password("1111").build()).getRole().getValue(),
                "Ожидаем, что роль крутого админа имеет вэлью ADMIN"
        );

        //Попытка повторной регистрации с занятым ником должна выбросить исключение
        assertThrows(Exception.class, () -> authenticationController.register(
                RegisterRequest.builder().username("user").password("2222").build()
        ), "Ожидаем, что повторная регистрация с уже занятым именем вызовет ошибку");
    }
}