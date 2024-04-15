import { Component, Input, OnDestroy, OnInit, input } from '@angular/core';
import { ITaskRes } from '../../../modules/itask-res';
import { Subscription, filter, map, mergeMap } from 'rxjs';
import { TaskSvcService } from '../../../services/task-svc.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {

  @Input() completed!: boolean;

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
        map(tasks => this.completed ? tasks?.filter(task => !task.completed) : tasks?.filter(task => task.completed)))
      .subscribe(data => {
        console.log(data);

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
