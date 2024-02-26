package com.alamega.backend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private final byte[] decodedKey = Base64.getDecoder().decode("ce454cc883dbe5d4e6e63b9b638f2045d7873ab2be0729a097727c35a6a9458355f69c870ead5bb0ba55b361bead1334ae1fddf85bc75a6809ff9569db4c779db2fb83e631015836cafd571ffbf56fcebce24af6d07bc273dec85f99558eeabf1de9837de654c89e6495cdfdc89f1b55fc8a767d8da6da330e97e196a728d9dc4df1d14d511a85be41923ed28bac36edde4b9c97d7178ccda802c9b419a7d7aaade41615709872c8acfb7c72b4b96f33eef621071841d65f7d39300b4b3606e4a7aa747418c7270284835f838dc669689f9ea14066821c16644d87c70255947920f4519e2fd2713ff5e947cee2b4933e2feee87144350b5f4c13972597862360");
    private final SecretKey SECRET_KEY = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
    private final JwtParser jwtParser = Jwts.parser().verifyWith(SECRET_KEY).build();

    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails, new HashMap<>());
    }

    public String generateToken(UserDetails userDetails, Map<String, Object> extraClaims) {
        return Jwts
                .builder()
                .subject(userDetails.getUsername())
                .claims(extraClaims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() * 1000 * 60 * 24 * 2))
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

    public Boolean isTokenValid(String token, UserDetails userDetails) {
        return (extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return jwtParser.parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }
}
