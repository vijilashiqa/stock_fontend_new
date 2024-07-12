import { Component, OnInit } from "@angular/core";

import { NbToastrService } from "@nebular/theme";
import { Router } from "@angular/router";
import {
  FormControl,
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { RoleservicesService } from "../../_services/roleservices.service";
import { StateService } from "../../_services/state.service";
import { DistrictService } from "../../_services/district.service";
import { BusinessService } from "../../_services/business.service";

@Component({
  selector: "ngx-add-bussiness",
  templateUrl: "./add-bussiness.component.html",
  styleUrls: ["./add-bussiness.component.scss"],
})
export class AddBussinessComponent {
  submit: boolean = false;
  addBusiness;
  getvendorlist;
  getmodellist;
  locationlist;
  gethsn;
  editfirstarray;
  vendor;
  loc;
  STB;
  listhead;
  editdata = {};
  id;
  editflag = false;
  editable: boolean = false;
  materialArray;
  count;
  getstates;
  dist;
  citylist;
  listarea;
  filtro;
  dropdata;

  constructor(
    private _fb: FormBuilder,
    private Bussiness: BusinessService,
    private toast: NbToastrService,
    private route: Router,
    private stateser: StateService,
    private districtser: DistrictService,
    public role: RoleservicesService
  ) {}

  async ngOnInit() {
    await this.createForm();
    await this.getstate();
    await this.getbanf();
    // await this.getdistrict();
  }

  async addstockIn() {
    console.log("add@@@@@");
    const invalid = [];
    const control = this.addBusiness.controls;
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
      }
    }
    console.log("invalid", invalid);
    this.submit = true;
    if (this.addBusiness.invalid) {
      return;
    }
    let result = await this.Bussiness.addbusiness(this.addBusiness.value);
    if (result && result[0].err_code == 0) {
      this.toast.success("", result[0]["msg"]);
      this.route.navigate(["/pages/business/list-business"]);
      console.log("add vendor ", result);
    } else {
      this.toast.warning("", result[0]["msg"]);
    }
  }

  get stockinid(): FormArray {
    return this.addBusiness.get("stockinid") as FormArray;
  }

  addMaterial() {
    this.stockinid.push(this.createMaterial());
  }

  deleteMatField(index: number) {
    this.stockinid.removeAt(index);
  }

  get bankdetails(): FormArray {
    return this.addBusiness.get("bankdetails") as FormArray;
  }

  addBankdetails() {
    this.bankdetails.push(this.createBankdetails());
  }

  deleteBankdetails(index: number) {
    this.bankdetails.removeAt(index);
  }

  createBankdetails(): FormGroup {
    return this._fb.group({
      bank: ["", Validators.required],
      bbname: ["", Validators.required],
      bbacctno: ["", Validators.required],
      bbifsc: ["", Validators.required],
    });
  }

  async getstate($event = "") {
    this.getstates = await this.stateser.getstate({ like: $event });
    console.log("state", this.getstates);
  }

  banklist;
  banklist1;

  async getbanf(event = "") {
    this.banklist = await this.Bussiness.getbank({ like: event });
    this.banklist1 = this.banklist[0];
    console.log("bank list ", this.banklist);
  }

  dropdown($event) {
    this.dropdata = $event.state_pk;
    console.log("drop", this.dropdata);
    this.getdistrict("");
  }

  async getdistrict($event = "") {
    this.dist = await this.districtser.getdistrict({
      state_fk: this.dropdata,
      like: $event,
    });
  }

  changeclear(...data) {
    for (let i of data) {
      this.addBusiness.controls[i].setValue("");
    }
  }

  changestate(index: number) {
    this.stockinid.at(index).get("badistid").setValue("");
  }

  changestates() {
    this.addBusiness.controls.distid.setValue("");
  }

  createMaterial(): FormGroup {
    return this._fb.group({
      bagstno: ["", Validators.required],
      baaddress: ["", Validators.required],
      bastateid: ["", Validators.required],
      badistid: ["", Validators.required],
      baaddrname: ["", Validators.required],
    });
  }

  createForm() {
    this.addBusiness = new FormGroup({
      bname: new FormControl("", Validators.required),
      pan: new FormControl("", Validators.required),
      bphoneno: new FormControl("", Validators.required),
      bemail: new FormControl("", Validators.required),
      tinno: new FormControl("", Validators.required),
      stateid: new FormControl("", Validators.required),
      distid: new FormControl("", Validators.required),
      stockinid: new FormArray([this.createMaterial()]),
      bankdetails: new FormArray([this.createBankdetails()]),
    });
  }
}
