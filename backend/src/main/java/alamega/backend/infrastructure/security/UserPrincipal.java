package alamega.backend.infrastructure.security;

import alamega.backend.features.user.model.User;
import lombok.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public record UserPrincipal(
        UUID id,
        String username,
        String password,
        Collection<? extends GrantedAuthority> authorities
) implements UserDetails {

    public static UserPrincipal create(User user) {
        List<SimpleGrantedAuthority> authorities = user.getRole().getAuthorities().stream()
                .map(auth -> new SimpleGrantedAuthority(auth.getValue()))
                .toList();

        return new UserPrincipal(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }

    public UUID getId() {
        return id;
    }

    @Override
    @NonNull
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    @NonNull
    public String getUsername() {
        return username;
    }
}
