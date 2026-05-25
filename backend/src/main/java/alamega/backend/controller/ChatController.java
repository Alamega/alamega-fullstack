package alamega.backend.controller;

import alamega.backend.model.chatMessage.ChatMessage;
import alamega.backend.model.user.User;
import alamega.backend.service.ChatMessageService;
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

@Controller
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatMessageService chatMessageService;
    private final UserDetailsService userService;

    @GetMapping("/history")
    @ResponseBody
    public List<ChatMessage> getChatHistory() {
        return chatMessageService.loadRecent();
    }

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ChatMessage handleMessage(ChatMessage messageDto, Principal principal) {
        String userId = null;
        if (principal != null) {
            String username = principal.getName();
            User user = (User) userService.loadUserByUsername(username);
            if (user.getId() != null) {
                userId = user.getId().toString();
            }
        }
        return chatMessageService.save(userId, messageDto.getText());
    }
}