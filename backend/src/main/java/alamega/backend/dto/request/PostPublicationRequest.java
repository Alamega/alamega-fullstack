package alamega.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostPublicationRequest {
    @Schema(name = "Текст поста")
    @Min(value = 1, message = "Текст поста не должен быть пустым!")
    @Max(value = 2048, message = "Не больше 2048 символов!")
    private String text;
}