import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL = environment.taskUrl;

  constructor(private http:HttpClient) { }

  getTasks(userId:string):Observable<any>{
    return this.http.get(`${this.API_URL}/${userId}`);
  }

  createTask(data:any):Observable<any>{
    return this.http.post(this.API_URL, data)
  }

  updateTask(taskId:string,data:any):Observable<any>{
    return this.http.put(`${this.API_URL}/${taskId}`,data)
  }

  deleteTask(taskId:string):Observable<any>{
    return this.http.delete(`${this.API_URL}/${taskId}`)
  }
}
