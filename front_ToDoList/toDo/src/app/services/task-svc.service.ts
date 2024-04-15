import { IResponceTasks } from './../modules/iresponce-tasks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map} from 'rxjs';
import { IresponseToken } from '../modules/iresponse-token';
import { ITask } from '../modules/itask';
import { ITaskRes } from '../modules/itask-res';

@Injectable({
  providedIn: 'root'
})
export class TaskSvcService {

  taskUrl: string = 'http://localhost:8080/task/';
  getUserUrl: string = 'http://localhost:8080/user/';

  tasksBehavior: BehaviorSubject<ITaskRes[] | undefined> = new BehaviorSubject<ITaskRes[] | undefined>(undefined);
  tasks$ = this.tasksBehavior.asObservable();



  constructor(
    private http: HttpClient
  ) { }

  createTask(newTask: ITask): Observable<IresponseToken> {
    const header = this.getHeader();
    const idUser = localStorage.getItem(('idUser'))
    return this.http.post<IresponseToken>(this.taskUrl + 'create/' + idUser, newTask, { headers: header })
  }

  getUser(): Observable<IResponceTasks> {
    const header: HttpHeaders = this.getHeader();
    const idUser: string | null = localStorage.getItem('idUser');
    return this.http.get<IResponceTasks>(this.getUserUrl + idUser, { headers: header })
    .pipe(map( data=>{
      this.tasksBehavior.next(data.response.tasks)
      return data;
    }))
  }

  changeCompleted(idTask:string):Observable<ITaskRes>{
    const header: HttpHeaders = this.getHeader();
    return this.http.patch<ITaskRes>(this.taskUrl + 'completed/' + idTask,null, {headers:header})
  }

  deleteTask(idTask:string):Observable<IresponseToken>{
    const header: HttpHeaders = this.getHeader();
    return this.http.delete<IresponseToken>(this.taskUrl + 'delete/' + idTask, {headers:header})
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
