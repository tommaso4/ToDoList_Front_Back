import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogSystemComponent } from './log-system.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'log-system/sign-in'},
  {path: 'log-system', component: LogSystemComponent,children:[
    { path: 'sign-in', component: SignInComponent },
    {path: 'log-in', component: LogInComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogSystemRoutingModule { }
