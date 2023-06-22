import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { DataService } from './services/data.service';
import { DatapassingDirective } from './directive/datapassing.directive';
import { OtpComponent } from './otp/otp.component';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { FormfileuploadComponent } from './formfileupload/formfileupload/formfileupload.component';
import { DistancecalculatorComponent } from './distancecalculator/distancecalculator.component';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    DatapassingDirective,
    OtpComponent,
    FormfileuploadComponent,
    DistancecalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [DataService,ToastrService,provideToastr({
    timeOut: 2000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    closeButton: true,
  }), ],
  bootstrap: [AppComponent]
})
export class AppModule { }
