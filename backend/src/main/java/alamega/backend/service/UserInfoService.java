package alamega.backend.service;

import alamega.backend.exception.ResourceNotFoundException;
import alamega.backend.model.user.User;
import alamega.backend.model.user.UserRepository;
import alamega.backend.model.userInfo.UserInfo;
import alamega.backend.model.userInfo.UserInfoRepository;
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