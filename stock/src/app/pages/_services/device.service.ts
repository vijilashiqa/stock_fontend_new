import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }



  
  async adddevice(params) {

    return await this.http.post("/device/adddevice", params).toPromise();
  }

  async editdevice(params) {

    return await this.http.post("/device/editdevice", params).toPromise();
  }



  async getdevice(params) {

    return await this.http.post("/device/getdevice", params).toPromise();
  }



  async listdevice(params) {

    return await this.http.post("/device/listdevice", params).toPromise();
  }


  
  async selectdevice(params) {

    return await this.http.post("/device/selectdevice", params).toPromise();
  }

}