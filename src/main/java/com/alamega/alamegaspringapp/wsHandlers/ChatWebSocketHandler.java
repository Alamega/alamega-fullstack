package com.alamega.alamegaspringapp.wsHandlers;

import com.google.gson.Gson;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();
    private final Queue<String> textMessages = new LinkedList<>();

    static class Message {
        String author;
        String text;
        String time;
        public String toString() {
            return String.format("{\"author\":\"%s\",\"text\":\"%s\",\"time\":\"%s\"}", author, text, time);
        }
    }

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
            Message newMessage = new Gson().fromJson(message.getPayload(), Message.class);
            newMessage.author = (session.getPrincipal() != null) ? session.getPrincipal().getName() : "Гость";
            textMessages.offer(newMessage.toString());
            if (textMessages.size() >= 10) {
                textMessages.poll();
            }
            for (WebSocketSession webSocketSession : webSocketSessions) {
                webSocketSession.sendMessage(new TextMessage(newMessage.toString()));
            }
        }
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) {
        webSocketSessions.remove(session);
    }
}
