package alamega.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI getOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("API для сайта")
                .version("1.0")
                .description("Бэкэнд для сайта https://alamega.onrender.com.")
                .contact(new Contact()
                        .name("Alamega")
                        .email("vladshuman@gmail.com")
                        .url("https://alamega.github.io")
                )
        );
    }
}