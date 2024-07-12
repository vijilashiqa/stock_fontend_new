import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(
    private http: HttpClient
  ) {

   }


   async adddepartment(params) {

    return await this.http.post("/department/adddepartment", params).toPromise();
  }

  async editdepartment(params) {

    return await this.http.post("/department/editdepartment", params).toPromise();
  }

  async getdepartment(params) {

    return await this.http.post("/department/getdepartment", params).toPromise();
  }
  
  async listdepartment(params) {

    return await this.http.post("/department/listdepartment", params).toPromise();
  }


  async selectdepartment(params) {

    return await this.http.post("/department/selectdepartment", params).toPromise();
  }
}
