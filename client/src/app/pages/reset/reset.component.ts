import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './reset.component.html'
})
export class ResetComponent implements OnInit {
  email = "";
  otp = "";
  newPassword = "";

  ngOnInit(){
    const savedEmail = localStorage.getItem("Resetemail");

    if(savedEmail){
      this.email = savedEmail;
    }
  }

  constructor(private http: HttpClient, private router: Router) {}
 

 resetPassword() {
    this.http.post('http://localhost:5000/api/auth/reset-password', {
      email: this.email,
      otp: this.otp,
      newPassword: this.newPassword
    })
    .subscribe({
      next: () => {
        
        alert("Password reset successful!");
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err.error.message)
    });
  }
}
