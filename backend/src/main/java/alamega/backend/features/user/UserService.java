package alamega.backend.features.user;

import alamega.backend.features.user.model.User;
import alamega.backend.features.user.repository.UserRepository;
import alamega.backend.infrastructure.security.UserPrincipal;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public Page<User> getAllByPage(Pageable pageable) {
        return userRepository.findAll(pageable);
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
        try {
            UUID uuid = UUID.fromString(id);
            return userRepository.findById(uuid);
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public void deleteById(String id) {
        try {
            UUID uuid = UUID.fromString(id);
            userRepository.deleteById(uuid);
        } catch (IllegalArgumentException ignored) {
        }
    }

    @Override
    @Nonnull
    public UserPrincipal loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .map(UserPrincipal::create)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Пользователь с именем " + username + " не найден."
                ));
    }
}