import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router:Router){}

  isLoggedIn(){
   return localStorage.getItem('token') !== null;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login'])
  }

  getUserName() {
  return localStorage.getItem('username');
}

isActive(path:string){
  return this.router.url === path;
}
}
