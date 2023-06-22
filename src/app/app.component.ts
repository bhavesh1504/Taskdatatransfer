import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DistanceCalculate';
  data: any;

  receiveData(data: string) {
    this.data = data;
  }
}
