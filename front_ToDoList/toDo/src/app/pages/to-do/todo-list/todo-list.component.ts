import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskSvcService } from '../../../services/task-svc.service';
import { ITaskRes } from '../../../modules/itask-res';
import { Subscription, filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy {

  tasks!: ITaskRes[];
  subTasksBehavior!: Subscription;
  subUser!: Subscription;
  subChangeTask!: Subscription;

  constructor(
    private taskSvc: TaskSvcService
  ) {
    this.subUser = this.taskSvc.getUser().subscribe()
  }

  ngOnInit(): void {
    this.subTasksBehavior = this.taskSvc.tasks$
      .pipe(
        filter(tasks => tasks !== undefined),
        map(tasks => tasks?.filter(task => !task.completed)))
      .subscribe(data => {
        if (data) {
          this.tasks = data;
        }
      })
  }

  ngOnDestroy(): void {
    if (this.subTasksBehavior) this.subTasksBehavior.unsubscribe();
    if (this.subUser) this.subUser.unsubscribe();
    if (this.subChangeTask) this.subChangeTask.unsubscribe();
  }

  changeCompleted(id: number) {
    this.subChangeTask = this.taskSvc.changeCompleted(id.toString())
      .pipe(mergeMap(() => this.taskSvc.getUser()))
      .subscribe();
  }

  deleteTask(idTask: number) {
    this.taskSvc.deleteTask(idTask.toString())
      .pipe(mergeMap(() => this.taskSvc.getUser()))
      .subscribe()
  }
}
