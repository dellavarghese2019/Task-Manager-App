import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  private api = environment.profileUrl
  private API = environment.profileUpdate;
  constructor(private http:HttpClient) { }

  getProfile(){
    return this.http.get(`${this.api}`);
  }

  updateProfile(data:any){
    return this.http.put(`${this.API}`, data);
  }
}
