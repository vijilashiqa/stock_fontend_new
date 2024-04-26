import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['/auth/login'])
    localStorage.clear();
  }
 
}
  
