import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerialnoService {
 

  constructor( private http: HttpClient) { }
  
  async addserial(params) {

    return await this.http.post("/model_serial_no/addmodel_serial_no", params).toPromise();
  }

  async editserial(params) {

    return await this.http.post("/model_serial_no/editmodel_serial_no", params).toPromise();
  }

  async listserialno(params) {

    return await this.http.post("/model_serial_no/listmodel_serial_no", params).toPromise();
  }


  async selectserialno(params) {

    return await this.http.post("/model_serial_no/selectmodel_serial_num", params).toPromise();
  }


  
  async getmodel_serial_no(params) {

    return await this.http.post("/model_serial_no/getmodel_serial_no", params).toPromise();
  }


    
  async addbuldserial(params) {

    return await this.http.post("/model_serial_no/addbuldserial", params).toPromise();
  }


    
  async listserialnum(params) {

    return await this.http.post("/model_serial_no/listserialnum", params).toPromise();
  }

  




  async getserial_no(params) {

    return await this.http.post("/model_serial_no/getserial_no", params).toPromise();
  }
}
