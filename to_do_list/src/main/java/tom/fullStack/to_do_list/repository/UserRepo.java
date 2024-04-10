package tom.fullStack.to_do_list.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tom.fullStack.to_do_list.entities.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
