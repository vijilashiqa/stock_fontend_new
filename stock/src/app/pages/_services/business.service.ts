import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private http: HttpClient
  ) { }


  async addbusiness(params) {

    return await this.http.post("/business/addbusiness", params).toPromise();
  }


  async listbusiness(params) {

    return await this.http.post("/business/listbusiness", params).toPromise();
  }


  
  async getbusinessedit(params) {

    return await this.http.post("/business/getbusinessedit", params).toPromise();
  }


  
  async getbusinessbankedit(params) {

    return await this.http.post("/business/getbusinessbankedit", params).toPromise();
  }


  
  async getbusinessaddredit(params) {

    return await this.http.post("/business/getbusinessaddredit", params).toPromise();
  }


  async businessedit(params) {

    return await this.http.post("/business/businessedit", params).toPromise();
  }


  
  async getbusiness(params) {

    return await this.http.post("/business/getbusiness", params).toPromise();
  }


  async getbank(params) {

    return await this.http.post("/business/getbank", params).toPromise();
  }

}
