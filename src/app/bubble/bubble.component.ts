import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import {UsersService} from '../Services/Users.service';
import {Message, MessageType} from '../Models/Message';
import {User} from '../Models/User';
import {MatDialog} from '@angular/material';
import {ImageViewerComponent} from '../ImageViewer/ImageViewer.component';
import {MatSnackBar} from '@angular/material';
import { ChooseUserDialogComponent } from '../ChooseUserDialog/ChooseUserDialog.component';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']
})
export class BubbleComponent implements OnInit {
  @Output()
  onDeleted=new EventEmitter<string>();
  @Output()
  onMobileClicked=new EventEmitter<Message>();
  @Output()
  onForward=new EventEmitter<any>();
  constructor(private UserService:UsersService ,public dialog: MatDialog,private snackBar:MatSnackBar) 
  {
   
  }
  @Input() msg:Message;
  user:User={};
  LoggedUser:User;
 

  ngOnInit() {
   
    if(window.innerWidth<959)
      this.isBigScreen=false;
    this.UserService.getUser(this.msg.userId).subscribe
    (user=>
      {
        this.user=user;
    
      });
   this.LoggedUser=this.UserService.currentUser;
   
  }
  openImageViewer(){
    const dialogRef = this.dialog.open(ImageViewerComponent, {
      width: '90%',
      height:'90%',
      data:this.msg.text,
      panelClass: 'imageViewer'
    });

    dialogRef.afterClosed().subscribe(result => {
     
   
    });
  }

  openForwardMsg(){
    const dialogRef = this.dialog.open(ChooseUserDialogComponent, {
      width: '60%',
      height:'60%',
      data:-1,
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open("Message was sent",null, {
        duration: 1000,
      });
    this.onForward.emit({id:result,msg:this.msg});
    });
  }
  isDeleted:boolean=false;
  isBigScreen:boolean=true;
 
  onDelete(){
    this.isDeleted=true;
    setTimeout(() => 
    {
      this.onDeleted.emit(this.msg.id);
    }, 400);
  }
  OnCopy(){
    if(this.msg.msgType!=MessageType.Text)  
    {
      this.snackBar.open("Copy only text",null, {
      duration: 1000,
    });
      return;
    }
this.snackBar.open("Message was copied to clipboard","Cancel", {
  duration: 1000,
});
this.copyText(this.msg.text);
}

copyText(val: string){
  let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  onMobileClick(){
    this.onMobileClicked.emit(this.msg);
  }
}

