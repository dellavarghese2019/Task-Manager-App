import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.authUrl;

  constructor(private http:HttpClient) { }


register(data:any):Observable<any>{
  return this.http.post(`${this.API_URL}/register`, data)
}

login(data:any):Observable<any>{
  return this.http.post(`${this.API_URL}/login`,data)
}



}

