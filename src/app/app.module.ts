import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularModule} from './angular/angular.module';
import {AngularComponent} from './angular/angular.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './Home/Home.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import {HttpClientModule} from '@angular/common/http';
import { BubbleComponent } from './bubble/bubble.component';
import { FormsModule } from '@angular/forms';
import { UserDetialsComponent } from './UserDetials/UserDetials.component';
import { SearchDialogComponent } from './SearchDialog/SearchDialog.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PushNotificationsModule } from 'ng-push'; 
import { DragDropDirective } from './DragDrop.directive';
import { ImageViewerComponent } from './ImageViewer/ImageViewer.component';
import { ChooseUserDialogComponent } from './ChooseUserDialog/ChooseUserDialog.component';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { ContactListComponent } from './ContactList/ContactList.component';

//const config: SocketIoConfig = { url: 'https://chat-app-backend-chatappbackend.apps.us-east-1.starter.openshift-online.com:4444/', options: {} };
@NgModule({
   declarations: [
    AngularComponent,
      AppComponent,
      LoginComponent,
      HomeComponent,
      BottomMenuComponent,
      BubbleComponent,
      UserDetialsComponent,
      SearchDialogComponent,
      DragDropDirective,
      ImageViewerComponent,
      ChooseUserDialogComponent,
      ContactListComponent
   ],
   imports: [
    AngularModule,
      FormsModule,
      FlexLayoutModule,
     
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ScrollToModule.forRoot(),
     
      PushNotificationsModule,
      NgxEmojiPickerModule.forRoot()
   ],
   providers: [],
   entryComponents: [
      BottomMenuComponent,
      UserDetialsComponent,
      SearchDialogComponent,
      ImageViewerComponent,
      ChooseUserDialogComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
  
 }
