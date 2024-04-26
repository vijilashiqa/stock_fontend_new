import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(
    private http: HttpClient
  ) { 


  }

  async adddist(params) {
    return await this.http.post("/location/adddist", params).toPromise();
  }

  async listdistrict(params) {
    return await this.http.post("/location/listdistrict", params).toPromise();
  }

  async getdistrictedit(params) {
    return await this.http.post("/location/getdistrictedit", params).toPromise();
  }

  async getdistrict(params) {
    return await this.http.post("/location/getdistrict", params).toPromise();
  }

  async editdistrict(params) {
    return await this.http.post("/location/editdistrict", params).toPromise();
  }



}
