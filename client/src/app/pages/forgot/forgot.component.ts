import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './forgot.component.html'
})
export class ForgotComponent {
  email = "";

  constructor(private http:HttpClient, private router: Router) {}

  sendOTP() {
    this.http.post('http://localhost:5000/api/auth/forgot-password', { email:this.email })
      .subscribe({
        next: () => {
          localStorage.setItem("Resetemail",this.email);
          alert("OTP sent to your email");
          this.router.navigate(['/reset-password']);
        },
        error: (err) => alert(err.error.message)
      });
  }
}

