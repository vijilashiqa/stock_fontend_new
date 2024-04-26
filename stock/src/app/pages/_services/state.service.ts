import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }



  async addstate(params) {
    return await this.http.post("/location/addstate", params).toPromise();
  }

  async liststate(params) {
    return await this.http.post("/location/liststate", params).toPromise();
  }

  async editstate(params) {
    return await this.http.post("/location/editstate", params).toPromise();
  }

  async getstateedit(params) {
    return await this.http.post("/location/getstateedit", params).toPromise();
  }

  async getstate(params) {
    return await this.http.post("/location/getstate", params).toPromise();
  }


}
