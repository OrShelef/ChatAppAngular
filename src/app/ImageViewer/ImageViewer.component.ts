import { Component ,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-ImageViewer',
  templateUrl: './ImageViewer.component.html',
  styleUrls: ['./ImageViewer.component.css']
})
export class ImageViewerComponent{

  constructor(private dialog:MatDialogRef<ImageViewerComponent>,@Inject(MAT_DIALOG_DATA) public img: string) { }

  

  onNoClick(): void {
    this.dialog.close();
  }
}
