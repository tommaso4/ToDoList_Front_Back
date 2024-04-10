package tom.fullStack.to_do_list.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tom.fullStack.to_do_list.entities.User;
import tom.fullStack.to_do_list.exception.ExistsException;
import tom.fullStack.to_do_list.exception.NotFoundException;
import tom.fullStack.to_do_list.repository.UserRepo;
import tom.fullStack.to_do_list.request.UserReq;

import java.util.List;

@Service
public class UserSvc {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    @Qualifier("BCript")
    private PasswordEncoder encoder;


    public User createUser (UserReq userReq){
        if (userRepo.existsByUsername(userReq.getUsername())){
            throw new ExistsException("Username do not avaiable");
        }
        User user = new User();
        user.setName(userReq.getName());
        user.setSurname(userReq.getSurname());
        user.setUsername(userReq.getUsername());
        user.setAge(userReq.getAge());
        user.setPassword(encoder.encode(userReq.getPassword()));
        return userRepo.save(user);
    }

    public User findUserByUsername (String username){
        return userRepo.findByUsername(username).orElseThrow(() -> new NotFoundException("User not found"));
    }

    public User findUserById(int id) throws NotFoundException {
        return userRepo.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    }
    public String deleteUser (int id){
        User user = findUserById(id);
        userRepo.delete(user);
        return "User with id: " + user.getId() + "deleted";
    }

    public List<User> getAll (){
        return userRepo.findAll();
    }

}
