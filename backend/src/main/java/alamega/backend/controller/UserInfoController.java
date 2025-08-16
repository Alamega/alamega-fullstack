package alamega.backend.controller;

import alamega.backend.model.userInfo.UserInfo;
import alamega.backend.service.UserInfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Tag(name = "Пользователи", description = "API для управления данными пользователей")
@RestController
@RequestMapping(value = "/userInfo", produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserInfoController {
    private final UserInfoService userInfoService;

    @Operation(summary = "Получение дополнительной информации о пользователе")
    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserInfo getUserInfo(@PathVariable UUID userId) {
        return userInfoService.getByUserId(userId);
    }

    @Operation(summary = "Сохранение дополнительной информации о пользователе")
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveUserInfo(@RequestBody UserInfo userInfo) {
        userInfoService.save(userInfo);
    }
}
