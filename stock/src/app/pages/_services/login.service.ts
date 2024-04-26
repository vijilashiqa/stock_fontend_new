// import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

 
  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }


  login(params) {
    console.log('LOGIN', params)
    return this.http.post<any>("/login/account", params);
  }
  logout() {
    this.router.navigate(['/auth/login'])
    localStorage.clear();
  }

  async resetpassword(params){

    return await this.http.post("/login/resetpassword",params).toPromise();
  } 
 
}