import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do.component';
import { CompletedComponent } from './completed/completed.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToDoComponent,
    CompletedComponent,
    CreateTaskComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class ToDoModule { }
