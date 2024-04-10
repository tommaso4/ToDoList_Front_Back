import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogSystemComponent } from './log-system.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/log-system/sign-in'},
  { path: 'sign-in', component: SignInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogSystemRoutingModule { }
