package alamega.backend.features.chat;

import alamega.backend.features.chat.model.ChatMessage;
import alamega.backend.features.chat.repository.ChatMessageRepository;
import alamega.backend.features.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository repository;
    private final UserService userService;

    public ChatMessage save(String authorId, String text) {
        return repository.save(ChatMessage.builder()
                .author(userService.findById(authorId).orElse(null))
                .text(text)
                .date(Instant.now())
                .build()
        );
    }

    public List<ChatMessage> loadRecent() {
        return repository.findBottom25ByOrderByDateAsc();
    }
}
