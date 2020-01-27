import { Component, OnInit ,Inject,ViewChild} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatSelectionList,MatSelectionListChange} from '@angular/material';
import {UsersService} from '../Services/Users.service';
import {User} from '../Models/User';
@Component({
  selector: 'app-ChooseUserDialog',
  templateUrl: './ChooseUserDialog.component.html',
  styleUrls: ['./ChooseUserDialog.component.css']
})
export class ChooseUserDialogComponent implements OnInit {
  @ViewChild('shoes', {static: true}) shoes:MatSelectionList;

  constructor(private dialog:MatDialogRef<ChooseUserDialogComponent>,private service:UsersService,@Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
    this.service.getUsers().subscribe(users=>this.Users=users);
    this.shoes.selectionChange.subscribe((s: MatSelectionListChange)=>{  
     
      this.shoes.deselectAll();
      s.option.selected=true;     
     this.service.getUsers().subscribe(users=>this.data=users.find(x=>x.id==this.shoes.selectedOptions.selected[0].value).id);
     
     
      }
      );
  }
  onNoClick(): void {
    this.dialog.close();
  }
  Users:User[];
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
