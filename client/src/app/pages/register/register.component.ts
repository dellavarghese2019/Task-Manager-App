import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password ='';

  constructor(private auth:AuthService,private router:Router){}

  onSubmit(){
    const data = {
      name : this.name,
      email :this.email,
      password : this.password
    }

    this.auth.register(data).subscribe({
      next:res => {
        alert("user registered successfully")
        this.router.navigate(['/login'])
      },
      error:err =>{
        alert(err.error.message);
      }
    })
  }

}
