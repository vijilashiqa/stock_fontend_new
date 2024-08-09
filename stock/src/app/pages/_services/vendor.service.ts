import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient,
        ) { }

  async addvendor(params) {

    return await this.http.post("/vendors/addvendor", params).toPromise();
  }

  async vendoredit(params) {

    return await this.http.post("/vendors/vendoredit", params).toPromise();
  }


  async getvendor(params) {

    return await this.http.post("/vendors/getvendor", params).toPromise();
  }

  async listvendor(params) {
    return await this.http.post("/vendors/listvendor",params).toPromise();
  }


  async getvendoredit(params) {
    return await this.http.post("/vendors/getvendoredit",params).toPromise();
  }  

  async getvendoraddreditd(params) {
    return await this.http.post("/vendors/getvendoraddredit",params).toPromise();
  }

  
  async getvendorbankedit(params) {
    return await this.http.post("/vendors/getvendorbankedit",params).toPromise();
  }

   
  async getcompany(params) {
    return await this.http.post("/vendors/getcompany",params).toPromise();
  }
}

