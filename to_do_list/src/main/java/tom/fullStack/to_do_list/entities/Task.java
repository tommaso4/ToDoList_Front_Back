package tom.fullStack.to_do_list.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_sequence")
    @SequenceGenerator(name="task_sequence", sequenceName = "task_sequence", allocationSize = 1)
    private int id;
    private String name;
    @Column(length = 500)
    private String description;
    private LocalDateTime creationDate;
    private Boolean completed;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
}
