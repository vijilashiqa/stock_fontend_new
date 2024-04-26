import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModelService {
  constructor(private http: HttpClient) {}

  async addmodel(params) {
    return await this.http.post("/model/addmodel", params).toPromise();
  }

  async editmodel(params) {
    return await this.http.post("/model/editmodel", params).toPromise();
  }

  async getmodel(params) {
    return await this.http.post("/model/getmodel", params).toPromise();
  }

  async listmodel(params) {
    return await this.http.post("/model/listmodel", params).toPromise();
  }

  async selectmodel(params) {
    return await this.http.post("/model/selectmodel", params).toPromise();
  }

  async selectqty(params) {
    return await this.http.post("/model_serial_no/selectqty", params).toPromise();
  }
}
