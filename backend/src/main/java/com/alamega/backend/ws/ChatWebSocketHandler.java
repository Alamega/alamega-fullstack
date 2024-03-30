package com.alamega.backend.ws;

import org.json.JSONObject;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();
    private final Queue<String> textMessages = new LinkedList<>();

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws IOException {
        for (String textMessage : textMessages) {
            session.sendMessage(new TextMessage(textMessage));
        }
        webSocketSessions.add(session);
    }

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, TextMessage message) throws Exception {
        if (!message.getPayload().equals("ping")) {
            JSONObject jsonMessage = new JSONObject(message.getPayload());
            jsonMessage.put("author", (session.getPrincipal() != null) ? session.getPrincipal().getName() : "Гость");
            textMessages.offer(jsonMessage.toString());
            if (textMessages.size() >= 10) {
                textMessages.poll();
            }
            for (WebSocketSession webSocketSession : webSocketSessions) {
                webSocketSession.sendMessage(new TextMessage(jsonMessage.toString()));
            }
        }
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
        webSocketSessions.remove(session);
    }
}
