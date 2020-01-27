import { Component, OnInit ,ViewChild,EventEmitter, Output,Input} from '@angular/core';
import {MatSelectionList,MatSelectionListChange} from '@angular/material';
import {UsersService} from '../Services/Users.service';
import {User} from '../Models/User';
@Component({
  selector: 'app-ContactList',
  templateUrl: './ContactList.component.html',
  styleUrls: ['./ContactList.component.css']
})
export class ContactListComponent implements OnInit {
  @ViewChild('shoes', {static: true}) shoes:MatSelectionList;
  @Output()
  OnSelectionChanged=new EventEmitter<User>();
  @Input()
  isBigScreen:boolean;
  constructor(private service:UsersService) { }
  Users:User[];
  ngOnInit() {
   if(this.service.currentUser==null)return;
    this.service.getUsers().subscribe(users=> this.Users=users.filter(x=>x.id!=this.service.currentUser.id));
    this.shoes.selectionChange.subscribe((s: MatSelectionListChange)=>{  
     
      this.shoes.deselectAll();
      s.option.selected=true;     
     this.service
     .getUsers()
     .subscribe(users=>this.OnSelectionChanged
    .emit(users.find(x=>x.id==this.shoes.selectedOptions.selected[0].value)));
     
     
      }
      );
  }
  onSearchContactChange(searchValue:string){
    if(searchValue.length==0)
    this.service.getUsers().subscribe(users=>this.Users=users);
   else
   this.service.getUsers().subscribe(users=>
    this.Users=users.filter(x=>
      x.username.toUpperCase().includes(searchValue.toUpperCase())||
      x.name.toUpperCase().includes(searchValue.toUpperCase())));
  }
}
