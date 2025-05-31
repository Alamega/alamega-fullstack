package alamega.backend.model.chatMessage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    @Override
    @NonNull
    <S extends ChatMessage> S save(@NonNull S entity);

    @Override
    void deleteById(@NonNull UUID postId);
}