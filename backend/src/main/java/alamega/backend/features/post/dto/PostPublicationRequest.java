package alamega.backend.features.post.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostPublicationRequest {
    @Schema(description = "Текст поста")
    @NotBlank(message = "Текст поста не должен быть пустым!")
    @Size(max = 2048, message = "Не больше 2048 символов!")
    private String text;
}