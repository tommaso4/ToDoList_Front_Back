package tom.fullStack.to_do_list.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tom.fullStack.to_do_list.entities.Task;
import tom.fullStack.to_do_list.entities.User;
import tom.fullStack.to_do_list.exception.NotFoundException;
import tom.fullStack.to_do_list.repository.TaskRepo;
import tom.fullStack.to_do_list.request.TaskReq;

import java.time.LocalDateTime;

@Service
public class TaskSvc {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserSvc userSvc;

    public Task createTask(TaskReq taskReq, int idUser){
        User user = userSvc.findUserById(idUser);
        Task task = new Task();
        task.setName(taskReq.getName());
        task.setDescription(taskReq.getDescription());
        task.setCreationDate(LocalDateTime.now());
        task.setCompleted(false);
        task.setUser(user);
        return taskRepo.save(task);
    }

    public String deleteTask(int idTask){
        taskRepo.delete(findTaskById(idTask));
        return "Task with id: " + idTask + "deleted";
    }

    public Task findTaskById(int idTask){
        return taskRepo.findById(idTask).orElseThrow(()-> new NotFoundException("Task do not found"));
    }

    public Task changeCompletedAtTask(int idTask){
        Task task = findTaskById(idTask);
        boolean completed = task.getCompleted();
        task.setCompleted(!completed);
        return taskRepo.save(task);
    }
}
