package tom.fullStack.to_do_list.security;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import tom.fullStack.to_do_list.entities.User;
import tom.fullStack.to_do_list.exception.UnAuthorizedException;

import java.util.Date;

@Component
@PropertySource("application.properties")
public class JwtTools {

    @Value("${spring.jwt.secret}")
    private String secret;

    @Value("${spring.jwt.expirationMs}")
    private String expirationMs;

    public String createToken(User user){
        return Jwts.builder()
                .claim("username",user.getUsername())
                .claim("idUser", user.getId())
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+Long.parseLong(expirationMs)))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes())).compact();
    }

    public void validateToken(String token) throws UnAuthorizedException {
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);
        }
        catch (Exception e){
            throw new UnAuthorizedException(e.getMessage());
        }
    }

    public String extractUsernameFromToken(String token){
        return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build().parseSignedClaims(token).
                getPayload().getSubject();
    }
}
