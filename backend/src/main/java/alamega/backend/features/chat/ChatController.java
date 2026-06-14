package alamega.backend.features.chat;

import alamega.backend.features.chat.model.ChatMessage;
import alamega.backend.infrastructure.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

@Tag(name = "Чат", description = "API для работы с чатом и сообщениями")
@Controller
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatMessageService chatMessageService;

    @Operation(summary = "Получение истории чата")
    @GetMapping("/history")
    @ResponseBody
    public List<ChatMessage> getChatHistory() {
        return chatMessageService.loadRecent();
    }

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ChatMessage handleMessage(
            @Payload @Valid ChatMessage messageDto,
            Principal principal
    ) {
        if (principal instanceof UsernamePasswordAuthenticationToken userPrincipal) {
            UserPrincipal userDetails = (UserPrincipal) userPrincipal.getPrincipal();
            return chatMessageService.save(Objects.requireNonNull(userDetails).getId().toString(), messageDto.getText());
        } else {
            return chatMessageService.save(null, messageDto.getText());
        }
    }
}