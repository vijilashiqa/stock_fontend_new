import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
  providedIn: 'root'
})
export class RoleservicesService {
  role: any = [];
  constructor(private http: HttpClient,) { }

  getToken() {
		return (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
	}
	getRefreshtoken(){
		return (localStorage.getItem('ref_token') ? JSON.parse(localStorage.getItem('ref_token')): null);
	}
	
	getroleid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['urole']) : 0);
	}
	
	getuserFname() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['fname'] : 0);
	}
	getroleval() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['umenu'] : 0);
	}
	getprofileid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['loginid'] : 0);
	}
	
	getid() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['id'] : 0);
	}
	
	
	getoperator() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['id'] : 0);
	}
	

	getmenurole(menu_role) {
		this.role = (localStorage.getItem('userinfo') ? JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['umenu']) : []);
		return this.role.find(x => x == menu_role) ? false : true;
	}



	getbusiness() {
		return (localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo'))['bid'] : 0);
	}
	


}
