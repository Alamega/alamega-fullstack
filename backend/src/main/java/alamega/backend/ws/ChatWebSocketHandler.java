package alamega.backend.ws;

import alamega.backend.model.chatMessage.ChatMessage;
import alamega.backend.service.ChatMessageService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@RequiredArgsConstructor
public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final List<WebSocketSession> webSocketSessions = new CopyOnWriteArrayList<>();
    private final ChatMessageService chatMessageService;
    private final ObjectMapper objectMapper;

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws IOException {
        webSocketSessions.add(session);
        for (ChatMessage chatMessage : chatMessageService.loadRecent()) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessage)));
        }
    }

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws IOException {
        JsonNode rootNode = objectMapper.readTree(message.getPayload());
        String text = rootNode.path("text").asText();
        Object userIdAttr = session.getAttributes().get("userId");
        String userId = (userIdAttr != null) ? userIdAttr.toString() : null;
        ChatMessage newMessage = chatMessageService.save(userId, text);
        String jsonToBroadcast = objectMapper.writeValueAsString(newMessage);
        for (WebSocketSession webSocketSession : webSocketSessions) {
            if (webSocketSession.isOpen()) {
                webSocketSession.sendMessage(new TextMessage(jsonToBroadcast));
            }
        }
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
        webSocketSessions.remove(session);
    }
}
