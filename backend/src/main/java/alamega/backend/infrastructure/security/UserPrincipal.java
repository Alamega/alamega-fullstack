package alamega.backend.infrastructure.security;

import alamega.backend.features.user.model.User;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@EqualsAndHashCode
@ToString
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
    private final UUID id;

    private final String username;

    @ToString.Exclude
    private final String password;

    private final Collection<? extends GrantedAuthority> authorities;

    public static UserPrincipal create(User user) {
        List<SimpleGrantedAuthority> authorities = user.getRole().getAuthorities().stream()
                .map(auth -> new SimpleGrantedAuthority(auth.getValue()))
                .toList();
        return new UserPrincipal(user.getId(), user.getUsername(), user.getPassword(), authorities);
    }
}
