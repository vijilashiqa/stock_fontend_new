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
import { RoleservicesService } from "../../../_services/roleservices.service";
import { VendorService } from "../../../_services/vendor.service";
import { StateService } from "../../../_services/state.service";
import { DistrictService } from "../../../_services/district.service";
import { BusinessService } from "../../../_services/business.service";

@Component({
  selector: "ngx-add-vendor",
  templateUrl: "./add-vendor.component.html",
  styleUrls: ["./add-vendor.component.scss"],
})
export class AddVendorComponent implements OnInit {
  submit: boolean = false;
  addvendor;
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
  id; getbusines;
  editflag = false;
  editable: boolean = false;
  materialArray;
  count; getbusines1;
  getstates;
  dist;
  citylist;
  listarea;
  filtro;
  dropdata;

  constructor(
    private _fb: FormBuilder,
    private vendorservices: VendorService,
    private toast: NbToastrService,
    private route: Router,
    private business: BusinessService,
    private stateser: StateService,
    private districtser: DistrictService,
    public role: RoleservicesService,
    private Bussiness :BusinessService
  ) { }

  async ngOnInit() {
    await this.createForm();
    await this.getstate();
    // await this.getdistrict();
    await this.getbusiness('')
    await this.getbanf()
  }

  async addvendors() {
    console.log("add@@@@@")
    const invalid = [];
    const control = this.addvendor.controls;
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
      }
    }
    console.log('invalid', invalid);
    this.submit = true;
    if (this.addvendor.invalid) {
      return;
    }
    let result = await this.vendorservices.addvendor(this.addvendor.value);
    if (result && result[0].err_code == 0) {
      this.toast.success("Success", result[0]["msg"],);
      this.route.navigate(["/pages/vendor/ListVendor"]);
      console.log(" ", result);
    } else {
      this.toast.warning("", result[0]["msg"]);
    }
  }

  get stockinid(): FormArray {
    return this.addvendor.get("stockinid") as FormArray;
  }

  addMaterial() {
    this.stockinid.push(this.createMaterial());
  }

  deleteMatField(index: number) {
    this.stockinid.removeAt(index);
  }

  get bankdetails(): FormArray {
    return this.addvendor.get("bankdetails") as FormArray;
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
      vbankname: ["", Validators.required],
      vbacctno: ["", Validators.required],
      vbifsc: ["", Validators.required],
    });
  }

  async getstate($event = "") {
    
    this.getstates = await this.stateser.getstate({ like: $event });
    console.log("state", this.getstates);
  }


  async getbusiness($event) {
    this.getbusines = await this.business.getbusiness({ like: $event });

    this.getbusines1 = this.getbusines[0]
    console.log("Business @@@", this.getbusines1);

  }

  changestate( index: number) {
    this.stockinid.at(index).get('dist').setValue('');
  }

  banklist;banklist1


  async getbanf(){

    this.banklist = await this.Bussiness.getbank({})

    this.banklist1= this.banklist[0]
console.log("bank list ", this.banklist);

  }

  


  dropdown($event) {
    this.dropdata = $event.state_pk;
    console.log("drop", this.dropdata)
    this.getdistrict("")
  }

  async getdistrict($event = "") {
    this.dist = await this.districtser.getdistrict({
      state_fk: this.dropdata,
      like: $event,
    });
  }

  changeclear(...data) {
    for (let i of data) {
      this.addvendor.controls[i].setValue("");
    }
  }


  createMaterial(): FormGroup {
    return this._fb.group({
      gst_no: ["", Validators.required],
      addrname: ["", Validators.required],
      state: ["", Validators.required],
      dist: ["", Validators.required],
      pincode: ["", Validators.required],
      address: ["", Validators.required],
    });
  }

  createForm() {
    this.addvendor = new FormGroup({
      bid: new FormControl("", Validators.required),
      vcompany: new FormControl("", Validators.required),
      vname: new FormControl("", Validators.required),
      vmobile: new FormControl("", Validators.required),
      vmail: new FormControl("", Validators.required),
      stockinid: new FormArray([this.createMaterial()]),
      bankdetails: new FormArray([this.createBankdetails()]),
    });
  }
}
