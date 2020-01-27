import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit {

  constructor(private bottomMenu:MatBottomSheetRef<BottomMenuComponent>) { }

  ngOnInit() {
  }
  openLink(event: MouseEvent): void {
    this.bottomMenu.dismiss();
    event.preventDefault();
  }
}
