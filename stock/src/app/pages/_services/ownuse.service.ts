import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnuseService {

  constructor(private http: HttpClient) { }
  
  async addownuse(params) {

    return await this.http.post("/own_use/addown_use", params).toPromise();
  }

  async editownuses(params) {

    return await this.http.post("/own_use/editown_use", params).toPromise();
  }

  async getownuse(params) {

    return await this.http.post("/own_use/getown_use", params).toPromise();
  }
  
  async listownuse(params) {

    return await this.http.post("/own_use/listown_use", params).toPromise();
  }


  async selectmodel_serial(params) {

    return await this.http.post("/own_use/selectmodel_serial", params).toPromise();
  }

  async addorremove(params) {

    return await this.http.post("/own_use/addorremovemodel_serial", params).toPromise();
  }

  async selectmodel_serialedit(params) {

    return await this.http.post("/own_use/selectmodel_serialedit", params).toPromise();
  }
 
  

  


  async addownuselocation(params) {

    return await this.http.post("/own_use/addownuselocation", params).toPromise();
  }

}