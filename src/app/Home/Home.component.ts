//#region Imports
import { Component, OnInit, ViewChild ,ElementRef, AfterViewInit,ViewChildren, QueryList} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { BottomMenuComponent} from '../bottom-menu/bottom-menu.component';
import {UsersService} from '../Services/Users.service';
import {User} from '../Models/User';
import {MatSelectionList,MatDialog,MatDrawer} from '@angular/material';
import {MessagesService} from '../Services/Messages.service';
import {UserDetialsComponent} from '../UserDetials/UserDetials.component';
import { Message, MessageType } from '../Models/Message';
import {Router} from '@angular/router';
import { SearchDialogComponent } from '../SearchDialog/SearchDialog.component';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import {Socket} from 'ngx-socket-io';
import { UUID } from 'angular2-uuid';
//#endregion

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  
})
export class HomeComponent implements OnInit ,AfterViewInit{

  
  constructor(
    public _bottomMenu:MatBottomSheet,
    public UserService:UsersService,
    public messagesService:MessagesService,
    public dialog: MatDialog,
    private router:Router,
    private _scrollToService: ScrollToService,
    private socket:Socket)
     { 

  }

  //#region Params

  @ViewChild('shoes', {static: true}) shoes:MatSelectionList;
  @ViewChild('drawer', {static: true}) drawer:MatDrawer;
  @ViewChild('scroller',{static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  isDragOver:boolean=false;
  Users: User[]=[];
  selectedItem:User;
  Messages:Message[]=[];
  textValue:string;
  scrollContainer?:any;
  IsSearch:boolean=false;
  CurrentSearchPosition:number=1;
  TotalSearchResults:number;
  isMobileMenuOpen:boolean=false;
  //#endregion

  //#region Search
 
  OnSearch(){
    if(this.IsSearch)
    this.FinishSearch();
    
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '250px',
      height:'250px',
      data:"",
     
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result==null || result == "")return;
     this.TotalSearchResults= this.Messages.filter(m=>m.text.includes(result) && m.msgType==MessageType.Text).map(x=>x.IsSearched=true).length;
     this.IsSearch=true;
    
     this.CurrentSearchPosition=-1;
     this.NextSearch();
    });
  }

  FinishSearch(){
    this.IsSearch=false;
    this.TotalSearchResults=1;
    this.CurrentSearchPosition=-1;
     this.Messages.map(x=>x.IsSearched=false);
  }

  NextSearch(){
    if(this.CurrentSearchPosition==this.TotalSearchResults-1)return;
  
    const config: ScrollToConfigOptions = {
      target: this.Messages.filter(x=>x.IsSearched==true).reverse()[++this.CurrentSearchPosition].id
    };

    this._scrollToService.scrollTo(config);
    
  }

  PreviousSaerch(){
    if(this.CurrentSearchPosition==0)return;
    
    const config: ScrollToConfigOptions = {
      target: this.Messages.filter(x=>x.IsSearched==true).reverse()[--this.CurrentSearchPosition].id
    };

    this._scrollToService.scrollTo(config);
   
  }
  //#endregion
 
 
  ngAfterViewInit(){
    this.scrollContainer = this.scrollFrame.nativeElement;  
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());  
  
  }
 
  ngOnInit() {
    
    if(this.UserService.currentUser==null)
    {
      this.router.navigate(['/login']);
      return;
    }
   this.UserService.getUsers().subscribe
   (users=>
    { 
      
    
      this.Users=users.filter(x=>x.id!=this.UserService.currentUser.id);     
      this.Users.map(u=>u.UnreadMessages=this.messagesService.messages.filter(x=>x.Unread && x.userId==u.id).length);
      if(window.innerWidth<959)
      {
        this.OnSelectionChanged(this.Users[0]);
      }
      this.Users.map(x=>
        {
          try{
           this.messagesService.getMessages(x.id)
           .subscribe(msg=>
            {
              console.log(msg);
              try{
                var text=msg[msg.length-1].text;
                x.LastMessage=text?text:'';
              }catch{}
              
          
            });
          }
          catch(err)
          {}
         
        });
    }
    );
   
    
   
   /* this.socket.on("MessageFromServer_"+this.UserService.currentUser.id,msg=>
  {
  
      if(this.selectedItem && this.selectedItem.id==msg.userId)
        {
         
          this.Messages.push(msg);
          this.messagesService.notify(msg,this.selectedItem);
        }
  });*/
  }


  OnSelectionChanged(user:User){
    this.selectedItem=user;
   this.messagesService.getMessages(this.selectedItem.id).subscribe
   (x=>{
     this.Messages=x;
     this.Messages.map(x=>
      {
        x.Unread=false;    
        if(x.msgType==MessageType.Image)
          x.text=localStorage.getItem(x.id);
         
          
      });
    }
    );
  
   
   this.Users.map(u=>u.UnreadMessages=this.messagesService.messages.filter(x=>x.Unread && x.userId==u.id).length);
   this.Users.map(x=>
    {
      try{
        this.messagesService.getMessages(x.id)
        .subscribe(msg=>
         {
           
           try{
             var text=msg[msg.length-1].text;
             x.LastMessage=text?text:'';
           }catch{}
           
       
         });
       }
       catch(err)
       {}
     
    });  

    if(this.drawer.opened)    
    {
      this.drawer.close();
      
    }
  }
  onSend(text:string,type:MessageType=MessageType.Text,uid?:number):void{
    if(text=='')return;
    let msg=new Message();
    msg.id=UUID.UUID();
    msg.otherId=uid==null?this.selectedItem.id:uid;
    msg.text=text;
    msg.time=new Date().toLocaleTimeString();
    msg.date=new Date().toDateString();
    msg.userId=this.UserService.currentUser.id; 
    msg.Unread=true;
    msg.msgType=type;    
    this.messagesService.Send(msg);
    if(this.Messages==null)
      this.Messages=[];

    if(uid==null)
      this.Messages.push(msg);
  
    switch(type){
      case MessageType.Pdf:
      case MessageType.Sound:
      case MessageType.Image:
      {
      
        localStorage.setItem(msg.id,text);
      break;
      }
    
    }


     

    this.Users.map(x=>
      {
        try{
          this.messagesService.getMessages(x.id)
          .subscribe(msg=>
           {
             
             try{
               var text=msg[msg.length-1].text;
               x.LastMessage=text?text:'';
             }catch{}
             
         
           });
         }
         catch(err)
         {}
      });  
    
    this.textValue  ="";
  }

  
  //#region Util
  OnLogout(){
     
    this.router.navigate(['/login']);
  }
  private scrollToBottom(): void {
    
    this.scrollContainer.scrollTo({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
 
 
  }
  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }
  //#endregion

  //#region Dialogs
openDialog(): void {
  const dialogRef = this.dialog.open(UserDetialsComponent, {
    width: '450px',
    height:'450px',
    data: this.selectedItem,
    panelClass: 'custom-dialog'
  });

  dialogRef.afterClosed().subscribe(result => {
  
  });

  

}

open():void{
  this._bottomMenu.open(BottomMenuComponent);
 }
//#endregion

  //#region Drag&Drop
  onFileOver(){
  
    this.isDragOver=true;
  }
  onFileLeave(){
    this.isDragOver=false;
  }
  uploadFile(event:any){
  
  try
  {
  if(event.startsWith("http"))
  {
    this.isDragOver=false;
    this.onSend(event,MessageType.Image);
    return;
  }
  }catch{}
  var reader = new FileReader();
  reader.onload =  (event) =>{
    var fileReader = event.target as FileReader;
    this.isDragOver=false;
    this.onSend(reader.result.toString(),MessageType.Image);
  };
  reader.readAsDataURL(event[0]);
  }
  //#endregion

  //#region Bubble Functions
 
 onDelete(event:string)
 {

  this.Messages.splice(this.Messages.findIndex(x=>x.id==event),1);
 }

 onForward(event:any){
   this.onSend(event.msg.text,event.msg.msgType,event.id);
 }
 onSearchContactChange(searchValue:string){

   if(searchValue.length==0)
    this.UserService.getUsers().subscribe(users=>this.Users=users);
   else
   this.UserService.getUsers().subscribe(users=>
    this.Users=users.filter(x=>
      x.username.toUpperCase().includes(searchValue.toUpperCase())||
      x.name.toUpperCase().includes(searchValue.toUpperCase())));
 }
 //#endregion

 toggled: boolean = false;
  handleSelection(event) {
 
  if(this.textValue==null)this.textValue='';
  this.textValue+=event.char;
  this.toggled=false;
}

onMobileClicked(msg:Message)
{
  this.isMobileMenuOpen=!this.isMobileMenuOpen;
}
}
