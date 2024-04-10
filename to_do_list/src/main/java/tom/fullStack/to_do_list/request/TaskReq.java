package tom.fullStack.to_do_list.request;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import tom.fullStack.to_do_list.entities.User;

import java.time.LocalDateTime;

@Data
public class TaskReq {

    @NotBlank(message = "name required")
    private String name;
    @NotBlank(message = "description required")
    private String description;
}
