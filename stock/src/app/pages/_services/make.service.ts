import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(
    private http: HttpClient
  ) { }


  async addmake(params) {

    return await this.http.post("/make/addmake", params).toPromise();
  }

  async editmake(params) {

    return await this.http.post("/make/editmake", params).toPromise();
  }

  async listmake(params) {

    return await this.http.post("/make/listmake", params).toPromise();
  }


  async selectmake(params) {

    return await this.http.post("/make/selectmake", params).toPromise();
  }


  
  async getmake(params) {

    return await this.http.post("/make/getmake", params).toPromise();
  }


}
