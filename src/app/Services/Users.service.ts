import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from '../Models/User';
import { Observable } from 'rxjs';
import {ConfigService} from '../Config.service';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private http:HttpClient,private config:ConfigService) 
{ 
 
}

currentUser:User;

@Cacheable()
getUsers():Observable<User[]>{
  var id=this.currentUser==null?1:this.currentUser.id;
  return this.http.get<User[]>(this.config.url+"Users/GetUsers/"+id);
          
                      
}
addUsers(users:User[]){
    
  this.http.post(this.config.url+"Users/AddUsers/",users).subscribe(data=>{
    console.log(data);
  },erorr=>console.log(erorr));    
}
@Cacheable()
getUser(id:number):Observable<User>{
 
  return   this.http.get<User>(this.config.url+"Users/GetUser/"+id);
}
}
