package alamega.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Имя пользователя не может быть пустым.")
    @Size(min = 3, max = 20, message = "Имя пользователя должно содержать от 3 до 20 символов.")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Имя пользователя может содержать только английские буквы, цифры и символ подчеркивания.")
    private String username;

    @NotBlank(message = "Пароль не может быть пустым.")
    @Size(min = 8, message = "Пароль должен содержать не менее 8 символов.")
    private String password;
}
