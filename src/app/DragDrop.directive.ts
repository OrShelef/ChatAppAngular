import { Directive,Input,Output,EventEmitter,HostListener,HostBinding, ElementRef } from '@angular/core';


@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output() onFileDropped = new EventEmitter<any>();
  @Output() onFileOver = new EventEmitter<any>();
  @Output() onFileLeave = new EventEmitter<any>();


  image:string;
  
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onFileOver.emit();

  }
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onFileLeave.emit();
  }
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
   
    
  
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
    else
    {
      this.onFileDropped.emit(this.ConvertImageToUrl(evt));
    }

  }
ConvertImageToUrl(evt){
  this.image=evt.dataTransfer.getData('text/html').toString();
  var att=this.image.split(' ').find(x=>x.startsWith("src=")).replace("src=","");
  return att.substring(1,att.length-1);
}
}
