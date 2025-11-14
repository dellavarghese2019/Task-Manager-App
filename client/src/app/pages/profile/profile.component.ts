import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    name:'',
    email:'',
    password:''
  }

  isLoading = false;
  isSaving = false;

  constructor(private profileService:ProfileService, private toastr:ToastrService){}

  ngOnInit(){
    this.loadUser();
  }

  loadUser(){
    this.isLoading = true;
    this.profileService.getProfile().subscribe({
      next:(res:any)=>{
        this.user.name = res.name;
        this.user.email = res.email;
        this.isLoading = false;
      }, error:() =>{
        this.isLoading = false;
        this.toastr.error('Failed to load profile');
      }
    })
  }

  updateProfile(){
    this.isSaving = true;
     this.profileService.updateProfile(this.user).subscribe({
      next:()=>{
        this.isSaving = false;
        this.toastr.success("Profile updated");
        localStorage.setItem('username',this.user.name)
      }, error:()=> {
        this.isSaving = false;
        this.toastr.error('Update failed')
      }
    })
  }
  
}
