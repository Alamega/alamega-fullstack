package alamega.backend.service;

import alamega.backend.model.userInfo.UserInfo;
import alamega.backend.model.userInfo.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;

    public UserInfo getByUserId(UUID userId) {
        return userInfoRepository.findByUserId(userId).orElse(userInfoRepository.save(
                UserInfo.builder()
                        .build())
        );
    }

    public UserInfo save(UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }
}
