import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  private api = environment.forgotApi;

  constructor (private http: HttpClient) { }


  forgot(data:any):Observable<any>{
    return this.http.post(`${this.api}`,data)
  }

}
