import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  dataTransfer(data:any) {
    
    return this.http.post('http://localhost:3000/posts',data)
  }

  testData(){
    const Request = 
    {
      "RequestId": "100033303_619202318842215",
      "MethodId": 20006,
      "SessionId": "25705e47-adf0-460c-8cd2-8e6ede31b700",
      "TellerID": "100033303",
      "TokenId": "",
      "X_Auth_Token": "",
      "IsEncrypt": false,
      "SessionExpiryTime": "6/19/2023 10:07:53 PM",
      "RequestData": "{\"supervisoruserid\":\"100033303\"}"
  }
    return this.http.post('https://10.15.15.119:8020/NewUIServices/AdocUIService/AdocUIService.svc/CashiLocationProcess',Request).pipe(map(res=>{
      // console.log(res);
      
    }))
  }

  sendOtp(mobileNumber:any) : Observable<any> {
    const Request = 
    {
      RequestId: "190935929_6202023172925863_Lite",
      MethodId: 1,
      SessionId: "de582bee-4940-4776-956c-44e31a17d4b5",
      TellerID: "190935929",
      TokenId: "",
      X_Auth_Token: "",
      IsEncrypt: false,
      RequestData: JSON.stringify({
        MethodId: "4",
        CustomerMobileNo: mobileNumber,
        MessageId: 1,
        OtpParam: {}
      })
    };
    return this.http.post<any>('https://10.15.15.61:8032/UIService.svc/UtilityOtp',Request).pipe(map(res=>{
      // console.log(res);

      return res;
      
    }))
  }

  formData(formData:any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/comments',formData)
  }
}
