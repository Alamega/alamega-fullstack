package alamega.backend.ws;

import alamega.backend.model.chatMessage.ChatMessage;
import alamega.backend.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();
    private final ChatMessageService chatMessageService;

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws IOException {
        webSocketSessions.add(session);
        for (ChatMessage textMessage : chatMessageService.loadRecent()) {
            session.sendMessage(new TextMessage(textMessage.toJson()));
        }
    }

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws IOException {
        JSONObject receivedJsonMessage = new JSONObject(message.getPayload());
        ChatMessage newMessage = chatMessageService.save(
                session.getAttributes().get("userId") != null ? session.getAttributes().get("userId").toString() : null,
                receivedJsonMessage.getString("text")
        );
        for (WebSocketSession webSocketSession : webSocketSessions) {
            webSocketSession.sendMessage(new TextMessage(newMessage.toJson()));
        }
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
        webSocketSessions.remove(session);
    }
}
