package alamega.backend.service;

import alamega.backend.model.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private final SecretKey SECRET_KEY;
    private final JwtParser jwtParser;

    public JwtService(@Value("${jwt.secret}") String secretFromEnv) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashedKey = digest.digest(secretFromEnv.getBytes(StandardCharsets.UTF_8));
        this.SECRET_KEY = new SecretKeySpec(hashedKey, "HmacSHA256");
        this.jwtParser = Jwts.parser().verifyWith(SECRET_KEY).build();
    }

    public String generateToken(User user) {
        return generateToken(user, new HashMap<>());
    }

    public String generateToken(User user, Map<String, Object> extraClaims) {
        return Jwts
                .builder()
                .subject(user.getUsername())
                .claims(extraClaims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(Date.from(Instant.now().plus(Duration.ofDays(2))))
                .signWith(SECRET_KEY)
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return jwtParser.parseSignedClaims(token).getPayload();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Boolean isTokenValid(String token, User user) {
        return (extractUsername(token).equals(user.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return jwtParser.parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }
}
