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


 async login(params) {
    console.log('LOGIN', params)
    return await this.http.post<any>("/login/account", params).toPromise();
  }
  logout() {
    this.router.navigate(['/auth/login'])
    localStorage.removeItem('token');
    localStorage.clear();
  }

  async resetpassword(params){

    return await this.http.post("/login/resetpassword",params).toPromise();
  } 
 
}