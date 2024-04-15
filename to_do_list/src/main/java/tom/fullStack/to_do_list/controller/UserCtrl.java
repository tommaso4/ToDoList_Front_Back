package tom.fullStack.to_do_list.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tom.fullStack.to_do_list.entities.User;
import tom.fullStack.to_do_list.request.LoginReq;
import tom.fullStack.to_do_list.request.UserReq;
import tom.fullStack.to_do_list.security.JwtTools;
import tom.fullStack.to_do_list.services.UserSvc;

import java.util.List;

@RestController
public class UserCtrl {

    @Autowired
    private UserSvc userSvc;

    @Autowired
    @Qualifier("BCript")
    private PasswordEncoder encoder;

    @Autowired
    private JwtTools jwtTools;

    @PostMapping("/auth/register")
    public ResponseEntity<CustomResponse> register (@RequestBody @Validated UserReq userReq, BindingResult result){
        if (result.hasErrors()){
            return CustomResponse.failure(result.getAllErrors().toString(), HttpStatus.BAD_REQUEST);
        }
        User user = userSvc.createUser(userReq);
        return CustomResponse.success(HttpStatus.CREATED.toString(), user, HttpStatus.CREATED);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<CustomResponse> login (@RequestBody @Validated LoginReq loginReq, BindingResult result){
        if (result.hasErrors()){
            return CustomResponse.failure(result.getAllErrors().toString(), HttpStatus.BAD_REQUEST);
        }

        User user = userSvc.findUserByUsername(loginReq.getUsername());
        if (encoder.matches(loginReq.getPassword(), user.getPassword())){
            String token = jwtTools.createToken(user);
            return CustomResponse.success(HttpStatus.OK.toString(), token, HttpStatus.OK);
        }else return CustomResponse.failure("Username/Password do not match",HttpStatus.NOT_FOUND);
    }

    @PostMapping("/auth/delete/{idUser}")
    public ResponseEntity<CustomResponse> deleteUser (@PathVariable int idUser){
        String deleted = userSvc.deleteUser(idUser);
        return CustomResponse.success(HttpStatus.OK.toString(), deleted,HttpStatus.OK);
    }

    @GetMapping("/user/getAll")
    public ResponseEntity<CustomResponse> getAll(){
        List<User> users = userSvc.getAll();
        return CustomResponse.success(HttpStatus.OK.toString(),users, HttpStatus.OK);
    }

    @GetMapping("user/{idUser}")
    public ResponseEntity<CustomResponse> getUserById(@PathVariable int idUser){
        User user = userSvc.findUserById(idUser);
        return CustomResponse.success(HttpStatus.OK.toString(),user,HttpStatus.OK);
    }
}


