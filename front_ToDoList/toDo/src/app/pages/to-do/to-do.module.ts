import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do.component';
import { CompletedComponent } from './completed/completed.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TodoListComponent } from './todo-list/todo-list.component';


@NgModule({
  declarations: [
    ToDoComponent,
    CompletedComponent,
    CreateTaskComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule
  ]
})
export class ToDoModule { }
