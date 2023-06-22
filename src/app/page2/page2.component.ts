import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  // constructor(){}
  @Input() receivedData: any;
  @Input() msgFromParent :any;

  data: any;
  value:string = "Hello from Page 1";
  name:any;
  // receiveData(data: string) {
  //   this.data = 'Hello from Page 1';
  // }

  

  ngOnInit()  {
    this.name = localStorage.getItem('name');
  }

}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

