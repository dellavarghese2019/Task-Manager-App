import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  private api = environment.profileUrl
  constructor(private http:HttpClient) { }

  getProfile(){
    return this.http.get(`${this.api}/me`);
  }

  updateProfile(data:any){
    return this.http.put(`${this.api}/update`, data);
  }
}
