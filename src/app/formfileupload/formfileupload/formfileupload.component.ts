import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-formfileupload',
  templateUrl: './formfileupload.component.html',
  styleUrls: ['./formfileupload.component.css']
})
export class FormfileuploadComponent implements OnInit{
  contactForm!: FormGroup;
  selectedFiles: File[] = []; 


  constructor(private fb: FormBuilder, private service: DataService, private toaster: ToastrService){}

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.contactForm = this.fb.group({
      name:['',Validators.compose([Validators.required])],
      mobile: ['',Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}$')])],
      document: ['',Validators.compose([Validators.required])]
    });
  }

  sendOtp() {
    const formData = new FormData();
    formData.append('name', this.contactForm.controls['name'].value);
    formData.append('mobile', this.contactForm.controls['mobile'].value);
    formData.append('document', this.contactForm.controls['document'].value);
    this.service.formData(formData).pipe(map(res => {
      // console.log('Form data:',res);
      this.toaster.success('Successfull')
      this.contactForm.reset();
    })).subscribe();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!['image/png', 'image/jpeg', 'image/gif', 'application/pdf'].includes(file.type)) {
          this.contactForm.controls['document'].setErrors({ 'format': true });
        } else {
          this.selectedFiles?.push(file);
  
          // Convert the file to base64-encoded string
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result?.toString().split(',')[1];
            this.contactForm.controls['document'].setValue(base64String);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  getSelectedFileURLs() {
    return this.selectedFiles.map((file:any) => URL.createObjectURL(file));
  }
}
