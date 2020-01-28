import { Injectable, ɵConsole } from '@angular/core';
import {Message, MessageType} from '../Models/Message';
import {HttpClient} from '@angular/common/http';
import {UsersService} from '../Services/Users.service';
import { Socket } from 'ngx-socket-io';
import {ConfigService} from '../Config.service';
import { Observable } from 'rxjs';
import { Cacheable } from 'ngx-cacheable';
import { PushNotificationsService} from 'ng-push';
import {User}  from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
 
constructor(private http:HttpClient,
  private UsersService:UsersService,
 
  private config:ConfigService,
  private notifyService:PushNotificationsService){
    
   this.notifyService.requestPermission();
  }


messages:Message[]=[];

@Cacheable()
getMessages(otherId?:number):Observable<Message[]>
{ 
  
   return this.http.get<Message[]>(this.config.url+"GetMessages/"+otherId+"/"+this.UsersService.currentUser.id);
}

Send(msg:Message)
{
  var temp=msg.text;
  if(msg.msgType!=MessageType.Text && !msg.text.startsWith("http"))  
  {
   
    msg.text="";

  }
  this.http.post(this.config.url+"SendMessage/",msg).subscribe(data=>{
    msg.text=temp;
    this.messages.push(msg);
  },erorr=>console.log(erorr));    
  //this.socket.emit("SendMessage",msg); 
  
  
}

notify(msg:Message,user:User){ //our function to be called on click
  let options = { //set options
    body: msg.text,
   icon:user.image,
   
  }
   this.notifyService.create(user.username, options).subscribe( 
      res => {      
        if(res["event"].type=="click")
        window.focus();
      },
      err => console.log(err)
  );
}
}
