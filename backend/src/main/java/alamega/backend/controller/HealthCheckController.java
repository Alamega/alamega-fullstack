package alamega.backend.controller;

import alamega.backend.dto.response.HealthStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Tag(name = "Общие", description = "API для базовых операций")
@RestController
@RequestMapping(produces = APPLICATION_JSON_VALUE)
public class HealthCheckController {
    @Operation(summary = "Проверка жив ли сервер")
    @GetMapping("/health")
    @ResponseStatus(HttpStatus.OK)
    public HealthStatus checkHealth() {
        return HealthStatus.builder()
                .status("UP")
                .message("Жив цел огурец!")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
