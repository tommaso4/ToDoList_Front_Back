import { Component, OnInit } from '@angular/core';
import { LogServiceService } from './services/log-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  title = 'toDo';

  username:string = localStorage.getItem('username') || '';

  constructor(
    private logSvc: LogServiceService
  ) { }

  isloggedIn(): boolean {
    return this.logSvc.isLoggedIn()
  }

  logout(): void {
    this.logSvc.logout()
  }
}
