import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor( private http: HttpClient) { }





  async addlocation(params) {

    return await this.http.post("/location/addlocation", params).toPromise();
  }


  async listlocation(params) {

    return await this.http.post("/location/listlocation", params).toPromise();
  }
}
