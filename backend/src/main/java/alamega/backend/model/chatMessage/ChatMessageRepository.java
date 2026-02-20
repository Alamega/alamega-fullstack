package alamega.backend.model.chatMessage;

import jakarta.annotation.Nonnull;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    @Cacheable(value = "messages")
    List<ChatMessage> findTop25ByOrderByDateDesc();

    @CacheEvict(value = "messages", allEntries = true)
    @Override
    @Nonnull
    <S extends ChatMessage> S save(S entity);
}