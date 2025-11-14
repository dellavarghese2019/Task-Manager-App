import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResetService } from '../../services/reset.service';

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

  constructor(private reset:ResetService, private router: Router) {}
 

 resetPassword() {
    this.reset.resetPass({
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
