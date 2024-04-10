import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogSystemRoutingModule } from './log-system-routing.module';
import { LogSystemComponent } from './log-system.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LogSystemComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    LogSystemRoutingModule,
    ReactiveFormsModule
  ]
})
export class LogSystemModule { }
