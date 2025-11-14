import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  private api = environment.resetApi;

  constructor(private http:HttpClient) { }

  resetPass(data:any):Observable<any>{
    return this.http.post(`${this.api}`, data)
  }
}
