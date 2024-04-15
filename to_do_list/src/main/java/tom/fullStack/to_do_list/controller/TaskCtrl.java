package tom.fullStack.to_do_list.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tom.fullStack.to_do_list.entities.Task;
import tom.fullStack.to_do_list.request.TaskReq;
import tom.fullStack.to_do_list.services.TaskSvc;

@RestController
public class TaskCtrl {

    @Autowired
    private TaskSvc taskSvc;

    @PostMapping("/task/create/{idUser}")
    public ResponseEntity<CustomResponse> createTask(@RequestBody @Validated TaskReq taskReq,
                                                     @PathVariable int idUser, BindingResult result){
        if (result.hasErrors()){
            return CustomResponse.failure(result.getAllErrors().toString(), HttpStatus.BAD_REQUEST);
        }
        Task task = taskSvc.createTask(taskReq,idUser);
        return CustomResponse.success(HttpStatus.CREATED.toString(),task,HttpStatus.CREATED);
    }

    @DeleteMapping("/task/delete/{idTask}")
    public ResponseEntity<CustomResponse> deleteTask(@PathVariable int idTask){
        String response = taskSvc.deleteTask(idTask);
        return CustomResponse.success(HttpStatus.OK.toString(), response, HttpStatus.OK);
    }

    @PatchMapping("/task/completed/{idTask}")
    public ResponseEntity<CustomResponse> changeCompleted(@PathVariable int idTask){
        Task changedTask = taskSvc.changeCompletedAtTask(idTask);
        return CustomResponse.success(HttpStatus.OK.toString(),changedTask,HttpStatus.OK);
    }

}
