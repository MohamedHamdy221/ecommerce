import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

 private readonly _HttpClient=inject(HttpClient)
 myHeaders:any={ token : localStorage.getItem('userToken')}
 getBrands():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`,
    {
      headers:this.myHeaders
    })
 }

}
