import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

otpForm!:FormGroup

constructor(private fb: FormBuilder, private service: DataService, private toaster: ToastrService){}

ngOnInit(): void {
  this.otpSendFrom();
  // this.toaster.success('its working');
}

otpSendFrom() {
  this.otpForm = this.fb.group({
    mobile: ['',Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])]
  });

}

sendOtp() {
  const mobileNumber = this.otpForm.controls['mobile'].value;
  this.service.sendOtp(mobileNumber).subscribe(data => {
    // console.log(data);
    this.toaster.success('OTP Send Successfully to ' + mobileNumber)
    
  });
}

}


