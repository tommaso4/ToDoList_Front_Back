package tom.fullStack.to_do_list.request;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskReq {

    @NotBlank(message = "name required")
    private String name;
    @NotBlank(message = "description required")
    private String description;
}
