import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../Services/Users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private usersService:UsersService) { }

  ngOnInit() {
  }
  userName:string='';
  OnLogin(){
    this.usersService.getUser(+this.userName).subscribe(user=>
      {
        this.usersService.currentUser=user;
       
      },err=>{}
      ,()=> this.router.navigate(['/home']));
   
  }
}
