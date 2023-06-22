import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { DataService } from '../services/data.service'
import { map } from 'rxjs';
 
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  @Output() dataEvent = new EventEmitter<string>();
  values:any
  currentvalue:any = '';
  addForm1!: FormGroup;
  constructor(private fb: FormBuilder, private service: DataService){
    this.addForm1 = this.fb.group({
      name:['']
    })

    

    }
  
    ngOnInit() {
      this.service.testData().subscribe((res)=>{
        // console.log('data',res);
        // console.log('inn');
        
      })

    }
  
  passData() {
    const data = 'Hello from Page 1';
    this.dataEvent.emit(data);
  }

  add() {
    this.values = this.addForm1.controls['name'].value
    // console.log(this.values);
    localStorage.setItem('name', this.values)
    this.service.dataTransfer(this.addForm1.controls['name'].value).subscribe((res)=> {
      // console.log(res);

      
    })
    
  }

  handleDataPassed(data:any){
// console.log(data);

  }

  testApi() {
    this.service.testData().pipe(map(res => {
      // console.log('data:',res);
      
    })).subscribe();
  }
}


