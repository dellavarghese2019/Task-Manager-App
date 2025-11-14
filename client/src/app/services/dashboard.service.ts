import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
   
  private api = environment.dashboardUrl;
  constructor(private http:HttpClient) { }

  getStats(){
   return this.http.get(`${this.api}/stats`)
  }
}
