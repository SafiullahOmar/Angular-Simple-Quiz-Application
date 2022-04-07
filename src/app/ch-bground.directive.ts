import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appChBground]'
})
export class ChBgroundDirective {

  @Input() IsCorrect:boolean=false;
  constructor( private  el:ElementRef,private render:Renderer2) { }
  @HostListener('click') answer(){
    if(this.IsCorrect){
      this.render.setStyle(this.el.nativeElement,'background','green');
      this.render.setStyle(this.el.nativeElement,'color','#fff');
      this.render.setStyle(this.el.nativeElement,'border','2px solid grey');
      
    }else{
      this.render.setStyle(this.el.nativeElement,'background','red');
      this.render.setStyle(this.el.nativeElement,'color','#fff');
      this.render.setStyle(this.el.nativeElement,'border','2px solid grey');
    }
  }

}
