import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'log-system'},
  { path: 'log-system', loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule) },
  { path: 'toDo', loadChildren: () => import('./pages/to-do/to-do.module').then(m => m.ToDoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
