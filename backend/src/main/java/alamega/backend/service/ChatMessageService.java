package alamega.backend.service;

import alamega.backend.model.chatMessage.ChatMessage;
import alamega.backend.model.chatMessage.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository repository;
    private final UserService userService;

    public ChatMessage save(String authorId, String text) {
        return repository.save(ChatMessage.builder()
                .author(userService.findById(authorId != null ? UUID.fromString(authorId) : null).orElse(null))
                .text(text)
                .date(Instant.now())
                .build()
        );
    }

    public List<ChatMessage> loadRecent() {
        return repository.findTop25ByOrderByDateAsc();
    }
}
