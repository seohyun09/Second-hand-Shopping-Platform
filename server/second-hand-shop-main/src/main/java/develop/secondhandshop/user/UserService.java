package develop.secondhandshop.user;

import develop.secondhandshop.security.JwtService;
import develop.secondhandshop.user.dto.AlertRequest;
import develop.secondhandshop.user.dto.ChangeIntroRequest;
import develop.secondhandshop.user.dto.ChangePasswordRequest;
import develop.secondhandshop.user.dto.JoinRequest;
import develop.secondhandshop.user.dto.LoginRequest;
import develop.secondhandshop.user.dto.MyPageResponse;
import develop.secondhandshop.user.dto.SendMoneyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtService jwtService;
    private final AlertRepository alertRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public MyPageResponse getMyPage(User user) {
        validateAlertUser(user);
        return new MyPageResponse(user.getId(), user.getEmail(), user.getIntro());
    }

    public MyPageResponse getOtherPage(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));
        validateAlertUser(user);
        return new MyPageResponse(user.getId(), user.getEmail(), user.getIntro());
    }

    private void validateAlertUser(User user) {
        if (user.getAlertCount() >= 5) {
            throw new RuntimeException("신고가 누적되어 차단된 유저입니다.");
        }
    }

    public String signIn(LoginRequest request) {
        User user = userRepository.findByEmail(request.email());
        if (user == null) {
            throw new RuntimeException("로그인 실패");
        }
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("로그인 실패");
        }
        return jwtService.create(user.getEmail());
    }

    @Transactional
    public void join(JoinRequest request) {
        User user = new User(request.name(), request.email(), passwordEncoder.encode(request.password()));
        userRepository.save(user);
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request, User user) {
        String newPassword = passwordEncoder.encode(request.newPassword());
        user.changePassword(newPassword);
        userRepository.save(user);
    }

    @Transactional
    public void changeIntro(ChangeIntroRequest request, User user) {
        user.changeIntro(request.intro());
        userRepository.save(user);
    }

    @Transactional
    public void alert(AlertRequest request, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));
        alertRepository.save(new Alert(request.alertTitle(), request.alertContent(), user));
        user.plusAlertCount();
    }

    @Transactional
    public void payment(Long id, User user, SendMoneyRequest request) {
        User other = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));
        if (user.getMoney() < request.money()) {
            throw new RuntimeException("금액이 부족합니다.");
        }
        other.receiveMoney(request.money());
        user.sendMoney(request.money());
        userRepository.save(user);
    }

    @Transactional
    public void block(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));
        user.block();
    }
}
