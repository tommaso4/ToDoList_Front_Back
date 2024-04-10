package tom.fullStack.to_do_list.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_sequence")
    @SequenceGenerator(name="task_sequence", sequenceName = "task_sequence", allocationSize = 1)
    private int id;
    private String name;
    private String surname;
    @Column(unique = true)
    private String username;
    private String password;
    private int age;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Task> tasks;

}
