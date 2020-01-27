import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-SearchDialog',
  templateUrl: './SearchDialog.component.html',
  styleUrls: ['./SearchDialog.component.css']
})
export class SearchDialogComponent  {

  constructor(private dialog:MatDialogRef<SearchDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: string)
   {
  
    }

  onNoClick(): void {
    this.dialog.close();
  }

}
