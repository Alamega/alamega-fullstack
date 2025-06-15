package alamega.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
public class TestAlamegaApplication {
    public static void main(String[] args) {
        SpringApplication.from(AlamegaSpringApplication::main).with(TestcontainersConfiguration.class).run(args);
    }
}
