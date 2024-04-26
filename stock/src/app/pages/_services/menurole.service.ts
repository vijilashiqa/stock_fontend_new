import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuroleService {

  constructor(private http: HttpClient,) { }

	async editrole(params) {
		return await this.http.post("/menurole/editmenurole", params).toPromise();
	  }

	  
	  async listrole(params) {
		return await this.http.post("/menurole/listmenurole", params).toPromise();
	  }
	

	  async getrole(params) {
		return await this.http.post("/menurole/getmenurole", params).toPromise();
	  } 
}
