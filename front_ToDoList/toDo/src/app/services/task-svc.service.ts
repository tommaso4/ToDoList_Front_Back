import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IresponseToken } from '../modules/iresponse-token';
import { ITask } from '../modules/itask';

@Injectable({
  providedIn: 'root'
})
export class TaskSvcService {

  createTaskUrl: string = 'http://localhost:8080/task/create/';

  constructor(
    private http: HttpClient
  ) { }

  createTask(newTask:ITask):Observable<IresponseToken> {
    const header = this.getHeader();
    const idser = localStorage.getItem(('idUser'))
    return this.http.post<IresponseToken>(this.createTaskUrl+idser,newTask,{headers: header})
  }


  getHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      const headder = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
      return headder;
    } else return new HttpHeaders();
  }
}
