import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuroleService {

  constructor(private http: HttpClient,) { }


  
	async addrole(params) {
		return await this.http.post("/menurole/addusers", params).toPromise();
	  }



	async editrole(params) {
		return await this.http.post("/menurole/editmenurole", params).toPromise();
	  }

	  
	  async listrole(params) {
		return await this.http.post("/menurole/listmenurole", params).toPromise();
	  }
	

	  async getrole(params) {
		return await this.http.post("/menurole/getmenurole", params).toPromise();
	  } 


	  async getfullname(params) {
		return await this.http.post("/menurole/getfullname", params).toPromise();
	  } 


	  async getumenu(params){

		return await this.http.post("/menurole/getumenurole", params).toPromise();
	
	  }
	  async listurole(params){
		return await this.http.post("/menurole/listurole", params).toPromise();
	  }
}
