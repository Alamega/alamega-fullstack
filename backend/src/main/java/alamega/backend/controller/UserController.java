package alamega.backend.controller;

import alamega.backend.model.user.User;
import alamega.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Tag(name = "Пользователи", description = "API для управления данными пользователей")
@RestController
@RequestMapping(value = "/users", produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "Получение всех пользователей (страница)")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public Page<User> getUsersPage(
            @RequestParam Integer page,
            @RequestParam Integer size
    ) {
        return userService.getAllByPage(PageRequest.of(page, size));
    }

    @Operation(summary = "Получение пользователя по ID")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserById(@PathVariable UUID id) {
        return userService.findById(id).orElseThrow(() -> new RuntimeException("Пользователь с таким id не найден."));
    }

    @Operation(summary = "Удаление пользователя по ID")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable UUID id) {
        userService.deleteById(id);
    }
}
