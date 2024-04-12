import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-system',
  templateUrl: './log-system.component.html',
  styleUrl: './log-system.component.scss'
})
export class LogSystemComponent{


  constructor(
    private router: Router
  ){ }


  isInSignRoute():boolean{
    const inSign = this.router.url
    if(inSign === '/log-system/log-system/sign-in')
      return true;
    else return false;
  }

}
