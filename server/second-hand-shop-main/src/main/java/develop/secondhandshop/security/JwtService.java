package develop.secondhandshop.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String LIKE_LION_AUTH_SUBJECT = "white hat school";
    private static final String TOKEN_PROVIDER = "white hat school server";
    private static final String SECRET_KEY = "white hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat schoolwhite hat school";

    private static final Long MILLISECONDS = 1000L;
    private static final Long SECONDS = 60L;
    private static final Long MINUTES = 60L;
    private static final Long HOURS = 344000000L;
    private static final int TOKEN_BEGIN_INDEX = 7;

    public String create(String email) {
        return TOKEN_PREFIX + Jwts.builder()
                .subject(LIKE_LION_AUTH_SUBJECT)
                .issuer(TOKEN_PROVIDER)
                .audience()
                .and().id(email)
                .claim("email", email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + MILLISECONDS * SECONDS * MINUTES * HOURS))
                .signWith(
                        new SecretKeySpec(
                                SECRET_KEY.getBytes(StandardCharsets.UTF_8),
                                SIG.HS256.key()
                                        .build()
                                        .getAlgorithm())
                )
                .compact();
    }

    public String parse(String token) {
        validTokenPrefix(token);

        try {
            return getEmail(token);
        } catch (ExpiredJwtException e) {
            log.error("토큰 만료", e);
            throw new IllegalArgumentException("토큰 만료", e);
        } catch (UnsupportedJwtException e) {
            log.error("미지원 토큰", e);
            throw new IllegalArgumentException("미지원 토큰", e);
        } catch (MalformedJwtException e) {
            log.error("토큰 형식 오류", e);
            throw new IllegalArgumentException("토큰 형식 오류", e);
        } catch (SignatureException e) {
            log.error("유효하지 않은 토큰 서명", e);
            throw new IllegalArgumentException("유효하지 않은 토큰 서명", e);
        }
    }

    private void validTokenPrefix(String token) {
        if (!token.startsWith(TOKEN_PREFIX)) {
            throw new IllegalArgumentException("유효 토큰 아님");
        }
    }

    private String getEmail(String token) {
        String subToken = token.substring(TOKEN_BEGIN_INDEX);
        return Jwts.parser()
                .verifyWith(
                        new SecretKeySpec(
                                SECRET_KEY.getBytes(StandardCharsets.UTF_8),
                                SIG.HS256.key()
                                        .build()
                                        .getAlgorithm())
                )
                .build()
                .parseSignedClaims(subToken)
                .getPayload()
                .get("email", String.class);
    }

    public String extractToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }
}