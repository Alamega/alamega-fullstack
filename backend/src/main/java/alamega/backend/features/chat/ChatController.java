package alamega.backend.features.chat;

import alamega.backend.features.chat.model.ChatMessage;
import alamega.backend.infrastructure.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.List;

@Tag(name = "Чат", description = "API для работы с чатом и сообщениями")
@Controller
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatMessageService chatMessageService;
    private final UserDetailsService userService;

    @Operation(summary = "Получение истории чата")
    @GetMapping("/history")
    @ResponseBody
    public List<ChatMessage> getChatHistory() {
        return chatMessageService.loadRecent();
    }

    @Operation(summary = "[WebSocket] Отправка сообщения в чат")
    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ChatMessage handleMessage(
            @Valid ChatMessage messageDto,
            @Parameter(hidden = true) Principal principal
    ) {
        String userId = null;
        if (principal != null) {
            String username = principal.getName();
            UserPrincipal user = (UserPrincipal) userService.loadUserByUsername(username);
            if (user.getId() != null) {
                userId = user.getId().toString();
            }
        }
        return chatMessageService.save(userId, messageDto.getText());
    }
}