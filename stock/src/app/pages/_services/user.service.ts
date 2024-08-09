import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,) { }

	async edituser(params) {
		return await this.http.post("/users/editusers", params).toPromise();
	  }

	  
	async editurole(params) {
		return await this.http.post("/menurole/editurole", params).toPromise();
	  }



    async adduser(params) {
      return await this.http.post("/users/addusers", params).toPromise();
      }



	  async listuser(params) {
		return await this.http.post("/users/listuser", params).toPromise();
	  }
	

	  async getuser(params) {
		return await this.http.post("/users/getuser", params).toPromise();
	  } 



  }