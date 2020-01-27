import {Component, Inject} from '@angular/core';
import {User} from '../Models/User';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-UserDetials',
  templateUrl: './UserDetials.component.html',
  styleUrls: ['./UserDetials.component.css']
})
export class UserDetialsComponent  {

  constructor(
    public dialogRef: MatDialogRef<UserDetialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User)
     {
      this.user=data;
    }
user:User;
  onNoClick(): void {
    this.dialogRef.close();
  }



}
