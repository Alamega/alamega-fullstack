package alamega.backend.service;

import alamega.backend.model.user.User;
import alamega.backend.model.user.UserRepository;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public Page<User> getAllByPage(Pageable pageable) {
        return new PageImpl<>(userRepository.findAll(), pageable, userRepository.count());
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Optional<User> findById(String id) {
        if (id == null) {
            return Optional.empty();
        }
        UUID uuid;
        try {
            uuid = UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
        return userRepository.findById(uuid);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(String id) {
        UUID uuid = UUID.fromString(id);
        userRepository.deleteById(uuid);
    }

    @Override
    @Nonnull
    public User loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                "Пользователь с именем ".concat(username).concat(" не найден.")
        ));
    }
}
