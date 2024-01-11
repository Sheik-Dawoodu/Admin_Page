import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { UsersService } from 'src/app/services/users.service';
import { ApiResponseInterface } from 'src/app/interfaces/common-interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent,NgIf,NgFor],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
 public userList:any[]=[]
 isSeller: boolean = true;
  userdata: any;
  constructor(private userServices:UsersService){}

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.userServices.getAllUser().subscribe({
      next:(res:ApiResponseInterface)=>{
        this.userList=res.data
        console.log(res.data);
      },
      error:(error:HttpErrorResponse) =>{
        console.log(error);        
      }
    })
  }

 public getCatogryById(id:string){
    console.log(id);
    this.userServices.getUserById(id).subscribe({
      next:(res:ApiResponseInterface)=>{
        this.userList = res.data;
      console.log('res',res);
      },
      error:console.log
    })
  }

  public blockUser (id:any){
    this.userServices.blockUser(id).subscribe({
      next:(res:ApiResponseInterface)=>{
       this.getUser();
      },
      error:(err:HttpErrorResponse)=>{
        console.log('Block User',err);  
      }
    })
  }
  public unBlockUser (id:any){
    this.userServices.UnBlockUser(id).subscribe({
      next:(res:ApiResponseInterface)=>{
        this.getUser();
      },
      error:(err:HttpErrorResponse)=>{
        console.log('UnBlock User',err);  
      }
    })
  }

  public userBlockOrUnblock(user:any){
    console.log('user status', user.status);
    // const checked=document.getElementById('checked')
  if(user.status === 1 ){
    return this.blockUser(user._id)
  }else if(user.status === 0){
    return this.unBlockUser(user._id)
  }
  }


}