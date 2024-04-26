import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor(
    private http: HttpClient
  ) {

   }


   async addhub(params) {

    return await this.http.post("/hub/addhub", params).toPromise();
  }

  async edithub(params) {

    return await this.http.post("/hub/edithub", params).toPromise();
  }

  async gethub(params) {

    return await this.http.post("/hub/gethub", params).toPromise();
  }
  
  async listhub(params) {

    return await this.http.post("/hub/listhub", params).toPromise();
  }


  
}
