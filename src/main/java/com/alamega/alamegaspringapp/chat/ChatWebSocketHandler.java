package com.alamega.alamegaspringapp.chat;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();
    private final Queue<String> textMessages = new LinkedList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        for (String textMessage : textMessages) {
            session.sendMessage(new TextMessage(textMessage));
        }
        webSocketSessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if (!message.getPayload().equals("ping")) {
            textMessages.offer(message.getPayload());
            if (textMessages.size() >= 10) {
                textMessages.poll();
            }
            for (WebSocketSession webSocketSession : webSocketSessions) {
                webSocketSession.sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        webSocketSessions.remove(session);
    }
}
