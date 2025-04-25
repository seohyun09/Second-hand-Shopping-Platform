package develop.secondhandshop.user;

import develop.secondhandshop.security.UserDetailsImpl;
import develop.secondhandshop.user.dto.AlertRequest;
import develop.secondhandshop.user.dto.ChangeIntroRequest;
import develop.secondhandshop.user.dto.ChangePasswordRequest;
import develop.secondhandshop.user.dto.JoinRequest;
import develop.secondhandshop.user.dto.LoginRequest;
import develop.secondhandshop.user.dto.MyPageResponse;
import develop.secondhandshop.user.dto.SendMoneyRequest;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<MyPageResponse> getMyPage(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userDetails.user();
        MyPageResponse response = userService.getMyPage(user);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MyPageResponse> getOtherPage(@PathVariable Long id) {
        MyPageResponse response = userService.getOtherPage(id);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<String> signIn(@RequestBody LoginRequest request) {
        String jwt = userService.signIn(request);
        return ResponseEntity.ok().header("Authorization", jwt).body("로그인 성공");
    }

    @PostMapping
    public ResponseEntity<String> join(@RequestBody JoinRequest request) {
        userService.join(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공");
    }

    @PatchMapping("/password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        userService.changePassword(request, userDetails.user());
        return ResponseEntity.ok().body("비밀번호 변경 성공");
    }

    @PatchMapping("/intro")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangeIntroRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        userService.changeIntro(request, userDetails.user());
        return ResponseEntity.ok().body("소개글 변경 성공");
    }

    @PatchMapping("/{id}/alert")
    public ResponseEntity<String> alert(
            @RequestBody AlertRequest request,
            @PathVariable Long id
    ) {
        userService.alert(request, id);
        return ResponseEntity.ok().body("사용자 신고 성공");
    }

    @PatchMapping("/{id}/payment")
    public ResponseEntity<String> payment(
            @PathVariable Long id,
            @RequestBody SendMoneyRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails
    ) {
        userService.payment(id, userDetails.user(), request);
        return ResponseEntity.ok().body("송금 성공");
    }

    @PatchMapping("/{id}/block")
    public ResponseEntity<String> block(@PathVariable Long id) {
        userService.block(id);
        return ResponseEntity.ok().body("사용자 차단 성공");
    }
}
