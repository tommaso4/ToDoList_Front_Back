import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ToDoComponent from './to-do.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CompletedComponent } from './completed/completed.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'toDo/todoList'},
  {path: 'toDo', component: ToDoComponent, children:[
    {path: 'todoList', component: TodoListComponent},
    {path: 'createTask', component: CreateTaskComponent},
    {path: 'completed', component: CompletedComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoRoutingModule { }
