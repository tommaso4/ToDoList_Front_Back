package tom.fullStack.to_do_list.request;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import tom.fullStack.to_do_list.entities.Task;

import java.util.List;

@Data
public class UserReq {

    @NotBlank(message = "name required")
    private String name;
    @NotBlank(message = "surname required")
    private String surname;
    @Column(unique = true)
    @NotBlank(message = "username required")
    private String username;
    @NotBlank(message = "password required")
    private String password;
    @NotNull(message = "age required")
    private int age;
}
