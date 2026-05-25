package alamega.backend.configuration.security;

import alamega.backend.model.user.User;
import alamega.backend.service.JwtService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtChannelInterceptor implements ChannelInterceptor {

    private final JwtService jwtService;
    private final UserDetailsService userService;

    @Override
    public Message<?> preSend(@NonNull Message<?> message, @NonNull MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor != null && accessor.getCommand() == org.springframework.messaging.simp.stomp.StompCommand.CONNECT) {
            List<String> authorization = accessor.getNativeHeader("Authorization");

            if (authorization == null || authorization.isEmpty() || authorization.getFirst() == null) {
                return message;
            }

            String bearerToken = authorization.getFirst();
            if (!bearerToken.startsWith("Bearer ") || bearerToken.length() <= 7) {
                return message;
            }

            String token = bearerToken.substring(7);
            String username = jwtService.extractUsername(token);
            User user = (User) userService.loadUserByUsername(username);

            if (jwtService.isTokenValid(token, user)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                accessor.setUser(authentication);
            }
        }
        return message;
    }
}