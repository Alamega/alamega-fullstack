package alamega.backend;

import org.springframework.aot.hint.annotation.RegisterReflectionForBinding;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

import java.util.UUID;

@SpringBootApplication
@EnableCaching
@RegisterReflectionForBinding({UUID[].class})
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class AlamegaSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlamegaSpringApplication.class, args);
    }
}