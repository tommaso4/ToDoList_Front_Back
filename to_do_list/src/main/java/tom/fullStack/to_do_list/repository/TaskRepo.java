package tom.fullStack.to_do_list.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.fullStack.to_do_list.entities.Task;

public interface TaskRepo extends JpaRepository<Task, Integer> {
}
