import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth:AuthService, private router:Router){}

  register(){
    this.router.navigate(['/register']);
  }

  onSubmit(){
    const data = {
      email:this.email,
      password:this.password
    }

    this.auth.login(data).subscribe({
      next:res =>{

        localStorage.setItem("token",res.token)
        localStorage.setItem("email",res.user.email)
        localStorage.setItem('userId', res.user.id)
        localStorage.setItem("username",res.user.name)

        alert("user loggedin successfully");
        this.router.navigate(['/dashboard'])
      },
      error:err=>{
        alert(err.error.message);
      }
    })
  }
}
