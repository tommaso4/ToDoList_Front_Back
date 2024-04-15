import { Component, OnInit } from '@angular/core';
import { LogServiceService } from './services/log-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  title = 'toDo';

  username!:string;

  constructor(
    private logSvc: LogServiceService
  ) { }

  isloggedIn(): boolean {
    if(this.logSvc.isLoggedIn()){
      this.username = localStorage.getItem('username') || '';
    }
    return this.logSvc.isLoggedIn()
  }

  logout(): void {
    this.logSvc.logout()
  }
}
