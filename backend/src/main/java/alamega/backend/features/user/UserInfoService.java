package alamega.backend.features.user;

import alamega.backend.features.user.model.User;
import alamega.backend.features.user.model.UserInfo;
import alamega.backend.features.user.repository.UserInfoRepository;
import alamega.backend.features.user.repository.UserRepository;
import alamega.backend.infrastructure.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;
    private final UserRepository userRepository;

    public UserInfo getByUserId(String userId) {
        User user = userRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new ResourceNotFoundException("Пользователь не найден"));
        return userInfoRepository.findByUserId(user.getId()).orElseGet(() -> userInfoRepository.save(UserInfo.builder().user(user).build()));
    }

    public UserInfo save(UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }
}