import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }
 
  

  login(params) {
    console.log('LOGIN', params)
    return this.http.post<any>("/login/account", params);
  }
  logout() {
    this.router.navigate(['auth/login'])
    localStorage.clear();
  }
 

  httppost(url,params){
    // let httpOptions = this.httpHeade.authToken();
     return this.http.post(url,params,httpOptions).pipe(
      map(res=>{
        return res;
      })
    ); 
  }



}
  
