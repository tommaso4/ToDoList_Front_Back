package tom.fullStack.to_do_list.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginReq {
    @NotBlank(message = "username required")
    private String username;
    @NotBlank(message = "password required")
    private String password;
}
