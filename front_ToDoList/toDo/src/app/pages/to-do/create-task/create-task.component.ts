import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { ITask } from '../../../modules/itask';
import { TaskSvcService } from '../../../services/task-svc.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subCreateTask!: Subscription;

  constructor(
    private fb: FormBuilder,
    private takSvc: TaskSvcService
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required)
    })
  }
  ngOnDestroy(): void {
    if(this.subCreateTask)this.subCreateTask.unsubscribe();
  }

  save() {
    const task:ITask = this.form.value as ITask;
    this.subCreateTask = this.takSvc.createTask(task).pipe(
      catchError(err=>{throw err})
    ).subscribe(()=>{
      this.form.reset()
    })
  }

}
