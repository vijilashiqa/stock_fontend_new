import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(
    private http: HttpClient
  ) { }

  async addinvoice(params) {

    return await this.http.post("/invoice/addinvoice", params).toPromise();
  }

  async listinvoice(params) {

    return await this.http.post("/invoice/listinvoice", params).toPromise();
  }

  async editinvoice(params) {
console.log("edit service");

    return await this.http.post("/invoice/editinvoice", params).toPromise();
  }

  async getinvoice_item_edit(params) {

    return await this.http.post("/invoice/getinvoice_item_edit", params).toPromise();
  }

  async getinvoice_edit(params) {

    return await this.http.post("/invoice/getinvoice_edit", params).toPromise();
  }


 async getinvoice_view(params){

  return await this.http.post("/invoice/getinvoice_view", params).toPromise();


  }


  async getmodel_edit(params){

    return await this.http.post("/invoice/getmodel_edit", params).toPromise();
  
  
    }


    async getinvoice(params){

      return await this.http.post("/invoice/getinvoice", params).toPromise();
    
    
      }
}