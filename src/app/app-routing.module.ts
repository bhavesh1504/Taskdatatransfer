import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { OtpComponent } from './otp/otp.component';
import { FormfileuploadComponent } from './formfileupload/formfileupload/formfileupload.component';
import { DistancecalculatorComponent } from './distancecalculator/distancecalculator.component';

const routes: Routes = [
  // {path:'', component:Page1Component},
  // {path:'page2',component:Page2Component},
  // {path:'otp',component:OtpComponent},
  // {path:'formfileupload',component: FormfileuploadComponent},
  { path:'', component: DistancecalculatorComponent },
  { path:'distancecalculate', component: DistancecalculatorComponent },
  { path: '**', redirectTo: 'distancecalculate', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
