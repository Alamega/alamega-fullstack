package alamega.backend.schedule;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlamegaApplicationRunner implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) {
        // Тут можно чето сделать после запуска...
    }
}