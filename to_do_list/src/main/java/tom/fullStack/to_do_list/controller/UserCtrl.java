package tom.fullStack.to_do_list.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tom.fullStack.to_do_list.entities.User;
import tom.fullStack.to_do_list.request.LoginReq;
import tom.fullStack.to_do_list.request.UserReq;
import tom.fullStack.to_do_list.services.UserSvc;

@RestController
public class UserCtrl {

    @Autowired
    private UserSvc userSvc;

    @Autowired
    @Qualifier("BCript")
    private PasswordEncoder encoder;

//    @Autowired
//    private JwtToken

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
            String str = "login succes";
            return CustomResponse.success(HttpStatus.OK.toString(), str, HttpStatus.OK);
        }else return CustomResponse.failure("Username/Password do not match",HttpStatus.NOT_FOUND);
    }

    @PostMapping("/auth/delete/{idUser}")
    public ResponseEntity<CustomResponse> deleteUser (@PathVariable int idUser){
        String deleted = userSvc.deleteUser(idUser);
        return CustomResponse.success(HttpStatus.OK.toString(), deleted,HttpStatus.OK);
    }

}


