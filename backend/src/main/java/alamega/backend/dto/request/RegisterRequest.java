package alamega.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @Schema(name = "Имя пользователя")
    @Size(min = 3, max = 20, message = "Имя пользователя должно содержать от 3 до 20 символов.")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Имя пользователя может содержать только английские буквы, цифры и символ подчеркивания.")
    private String username;

    @Schema(name = "Пароль")
    @Size(min = 8, message = "Пароль должен содержать не менее 8 символов.")
    private String password;
}