package alamega.backend.ws;

import alamega.backend.model.user.User;
import alamega.backend.service.JwtService;
import alamega.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtHandshakeInterceptor implements HandshakeInterceptor {
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public boolean beforeHandshake(
            @NonNull ServerHttpRequest request,
            @NonNull ServerHttpResponse response,
            @NonNull WebSocketHandler wsHandler,
            @NonNull Map<String, Object> attributes
    ) {
        List<String> secWebsocketProtocolHeader = request.getHeaders().get("Sec-WebSocket-Protocol");
        if (secWebsocketProtocolHeader != null && !secWebsocketProtocolHeader.isEmpty()) {
            String token = secWebsocketProtocolHeader.getFirst();
            User user = userService.loadUserByUsername(jwtService.extractUsername(token));
            if (jwtService.isTokenValid(token, user)) {
                attributes.put("userId", user.getId());
                response.getHeaders().set("Sec-WebSocket-Protocol", token);
            }
        }
        return true;
    }

    @Override
    public void afterHandshake(
            @NonNull ServerHttpRequest request,
            @NonNull ServerHttpResponse response,
            @NonNull WebSocketHandler wsHandler,
            Exception exception) {
    }
}
