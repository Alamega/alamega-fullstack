package alamega.backend.features.user;

import alamega.backend.features.user.model.UserInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Tag(name = "Пользователи", description = "API для управления данными пользователей")
@RestController
@RequestMapping(value = "/users/info", produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserInfoController {
    private final UserInfoService userInfoService;

    @Operation(summary = "Получение дополнительной информации о пользователе")
    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserInfo getUserInfo(@PathVariable String userId) {
        return userInfoService.getByUserId(userId);
    }

    @Operation(summary = "Сохранение дополнительной информации о пользователе")
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveUserInfo(@Valid @RequestBody UserInfo userInfo) {
        userInfoService.save(userInfo);
    }
}
