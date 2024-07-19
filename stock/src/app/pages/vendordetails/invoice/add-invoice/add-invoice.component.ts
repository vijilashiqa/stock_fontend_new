import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
// import { HeadendService, RoleservicesService } from '../../_services';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

import { HsnService } from "../../../_services/hsn.service";
import { BusinessService } from "../../../_services/business.service";
import { VendorService } from "../../../_services/vendor.service";
import { NbToastrService } from "@nebular/theme";
import { InvoiceService } from "../../../_services/invoice.service";
import { ModelService } from "../../../_services/model.service";
import { DeviceService } from "../../../_services/device.service";
import { MakeService } from "../../../_services/make.service";
import { RoleservicesService } from "../../../_services/roleservices.service";

@Component({
  selector: "ngx-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.scss"],
})
export class AddInvoiceComponent {
  submit: boolean = false;
  addinvoice;
  getbusinessd;
  getbuss;
  getvendorlist;
  getvendora;
  getvend;
  getmodell
  getbusinessaddres;
  id;
  getadd; dropdata1
  getvd;
  reduceaddress;
  slice2;
  reducesvendor; getmakel; getdevicel
  sllice1; getmodel2
  disabled; gsttypevalue
  vall; total; dropdata
  constructor(
    private _fb: FormBuilder,
    private vendor: VendorService,
    private Business: BusinessService,
    private toast: NbToastrService,
    private devices: DeviceService,
    private make: MakeService,
    private route: Router,
    private models: ModelService,
    private invoiceser: InvoiceService,
    public role: RoleservicesService,
  ) { }

  async ngOnInit() {
    await this.createForm();
    if(this.role.getroleid() > 888){
      await this.getBusiness()
      }
  else{
    console.log("34433434",this.role.getbusiness());
    
    this.addinvoice.get('busid').setValue(this.role.getbusiness());
     await this.getmake();
    await this.getdevice();
    await this.getmodel();
  }

    // await this.getBusiness();
    await this.getbusinessaddress();
    await this.getVendor();
    await this.getvendoraddrs();
    // await this.getmake();
    // await this.getdevice();
    // await this.getmodel();
  }

  async addstockIn() {
    this.submit = true;
    const invalid = [];
    const control = this.addinvoice.controls;
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
      }
    }
    if (this.addinvoice.invalid) {
      console.log("Invalid value -----", invalid);
      return;
    }
    let result = await this.invoiceser.addinvoice(this.addinvoice.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("", result[0]["msg"]);
      this.route.navigate(["/pages/vendor/list-invoice"]);
    } else {
      this.toast.warning("", result[0]["msg"]);
    }
  }
  async getBusiness(event ='') {
    this.getbusinessd = await this.Business.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
    // console.log("get business ", this.getbuss);
  }
  async getbusinessaddress(event ='') {

    console.log("event the ",event);
    
if(this.addinvoice.value["busid"]){
  this.getbusinessaddres = await this.Business.getbusinessaddredit({
    id: this.addinvoice.value["busid"] ||  this.addinvoice.get('busid').setValue(this.role.getbusiness()),
    like: event,
  });
  this.getadd = this.getbusinessaddres[0];

}

     console.log("address @@@@ ", this.getadd);
  }




  async Changedata() {
    let opp = this.addinvoice.value["busaddr"];
    let dd = this.getadd.filter((id) => id.id == opp).map((id) => id.bagstno);
    this.reduceaddress = dd.reduce((a, v) => ({ ...a, v }));
    this.slice2 = this.reduceaddress.slice(0, 2);
    await this.disable();
  }



  async getVendor() {
    this.getvendorlist = await this.vendor.listvendor({});
    this.getvend = this.getvendorlist[0];
  }
  async getvendoraddrs(event ='') {
    if(this.addinvoice.value["vendorid"]){
    this.getvendora = await this.vendor.getvendoraddreditd({
      id: this.addinvoice.value["vendorid"], like:event
    });
    this.getvd = this.getvendora[0];
    // console.log("get vendor ", this.getvd);
    let getgst = this.getvd.gst_no;

    // console.log("gst no@@", getgst);
  }
  }
  async changeaddress() {
    let opp1 = this.addinvoice.value["vaddr"];
    let dd = this.getvd.filter((id) => id.id == opp1).map((id) => id.gst_no);
    this.reducesvendor = dd.reduce((a, v) => ({ ...a, v }));
    this.sllice1 = this.reducesvendor.slice(0, 2);
    await this.disable();
  }

  addMaterial() {
    this.invoiceForm.push(this.createinvoice());
  }

  deleteMatField(index: number) {
    this.invoiceForm.removeAt(index);
  }


  changemodel(index: number) {
    this.invoiceForm.at(index).get('modelid').setValue('');
  }


  changemake(index : number){
    this.invoiceForm.at(index).get('deviceid').setValue('');
    this.invoiceForm.at(index).get('modelid').setValue('');
  }

 async clearall(){
// console.log("clear all");
// //     this.invoiceForm.at(index + 1).get('makeid').setValue('');
// //     this.invoiceForm.at(index +1 ).get('deviceid').setValue('');
// //     this.invoiceForm.at(index +1).get('modelid').setValue('');
// // await this.getBusiness('')
// this.getbusinessd = await this.Business.getbusiness({like :""});
  }


  createinvoice(): FormGroup {
    return this._fb.group({
      makeid: ["", Validators.required],
      deviceid: ["", Validators.required],
      modelid: ["", Validators.required],
      itemqty: ["", Validators.required],
      itemgst: ["", Validators.required],
      itemamt: ["", Validators.required],
      igst: ["", Validators.required],
      sgst: ["", Validators.required],
      cgst: ["", Validators.required],
      total: [{ value: '', disabled: true }],
    });
  }
  async taxcal(itemtaxtype, amount, taxper) {
    // console.log("..........", taxper);
    if (itemtaxtype == 0) {
      // Inclusive
      let amt = (Number(amount) / ((100 + taxper) / 100)).toFixed(2);
      let taxamt = (Number(amount) - Number(amt)).toFixed(2);
      return { amt: amt, taxamt: taxamt };
    } else {
      // Exclusive
      let amt = Number(amount).toFixed(2);
      let taxamt = ((Number(amount * taxper) / 100)).toFixed(2)
      return { amt: amt, taxamt: taxamt };
    }
  }
  async onkeyupQty(event: any, index: number) {

    // console.log("index value@@@@@@@@@@@@ onkeyupQty", index)
    let taxper = this.sllice1 == this.slice2 ? (Number(this.addinvoice.value["invoiceid"][index]["sgst"] || this.addinvoice.value['sgst']) + Number(this.addinvoice.value["invoiceid"][index]["cgst"] || this.addinvoice.value['cgst'])) : Number(this.addinvoice.value["invoiceid"][index]["igst"] || this.addinvoice.value['igst']);
    // console.log("tax per amount", taxper);
    let res = await this.taxcal(Number(this.addinvoice.value["invoiceid"][index]["itemgst"]), Number(this.addinvoice.value["invoiceid"][index]["itemamt"]), taxper);
    let amount = Number(res["amt"]); let tax = Number(res["taxamt"]);
    this.total = (Number(amount + tax) * Number(this.addinvoice.value["invoiceid"][index]["itemqty"])).toFixed(3)
    const controlArray = <FormArray>this.addinvoice.get('invoiceid');
    controlArray.controls[index].get('total').setValue(this.total);

  }

  get invoiceFormCtrl() {
    return this.invoiceForm.controls;
  }
  get ctrl() {
    return this.addinvoice.controls;
  }
  get invoiceForm(): FormArray {
    return this.ctrl.invoiceid as FormArray;
  }
  getInvoiceByIndex(i: number) {
    // console.log(" afasdf!!!!!!!!!!!!!!!!!", this.invoiceFormCtrl[i]["controls"]);
    return this.invoiceFormCtrl[i]["controls"];
  }

  changedr() {
    // console.log("clear");
    // this.invoiceForm.reset();
    this.invoiceForm.removeAt(1);
  }
  async disable() {
    // console.log("slice in disable", this.sllice1);
    // console.log("slice in disable", this.slice2);
    if (this.sllice1 == this.slice2) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }
  changeaddres() {
    // console.log("clear address");
    this.addinvoice.controls["busaddr"].setValue("");
  }


  changevendor() {

    this.addinvoice.controls["vaddr"].setValue("");
  }


  dropdown($event) {
    this.dropdata = $event.makeid;
    this.getmodel()
  }



  async getmake(event ='') {
    this.getmakel = await this.make.selectmake({like :event , bid :this.addinvoice.value["busid"]});
    // console.log("get make ", this.getmakel);

  }


  dropdownd($event) {
    this.dropdata1 = $event.deviceid;
    // console.log("drop device", this.dropdata1)
    //  this.getdistrict( "") 
    this.getmodel()
  }


  changegstype(event) {
    console.log(" gst ttype", event.target.value, " disable", this.disabled);
    this.gsttypevalue = event.target.value;

  }

  addvalidation(idx: number) {
    const controlArray = <FormArray>this.addinvoice.get('invoiceid');
    console.log("index!!!!!!!!!!!!!!!!!!", idx);
    if (this.gsttypevalue == 0 && this.disabled == false) {
      this.addinvoice.get('sgst').clearValidators();
      this.addinvoice.get('sgst').updateValueAndValidity();
      this.addinvoice.get('cgst').clearValidators();
      this.addinvoice.get('cgst').updateValueAndValidity();
      this.addinvoice.get('igst').clearValidators();
      this.addinvoice.get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('sgst').clearValidators();
      controlArray.controls[idx].get('sgst').updateValueAndValidity();
      controlArray.controls[idx].get('cgst').clearValidators();
      controlArray.controls[idx].get('cgst').updateValueAndValidity();
      controlArray.controls[idx].get('igst').setValidators(Validators.required);
      controlArray.controls[idx].get('igst').updateValueAndValidity();
    }
    if (this.gsttypevalue == 0 && this.disabled == true) {
      this.addinvoice.get('sgst').clearValidators();
      this.addinvoice.get('sgst').updateValueAndValidity();
      this.addinvoice.get('cgst').clearValidators();
      this.addinvoice.get('cgst').updateValueAndValidity();
      this.addinvoice.get('igst').clearValidators();
      this.addinvoice.get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('igst').clearValidators();
      controlArray.controls[idx].get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('cgst').setValidators(Validators.required);
      controlArray.controls[idx].get('cgst').updateValueAndValidity();
      controlArray.controls[idx].get('sgst').setValidators(Validators.required);
      controlArray.controls[idx].get('sgst').updateValueAndValidity();
    }

    if (this.gsttypevalue == 1 && this.disabled == true) {
      this.addinvoice.get('igst').clearValidators();
      this.addinvoice.get('igst').updateValueAndValidity();
      this.addinvoice.get('sgst').setValidators(Validators.required);
      this.addinvoice.get('sgst').updateValueAndValidity();
      this.addinvoice.get('cgst').setValidators(Validators.required);
      this.addinvoice.get('cgst').updateValueAndValidity();
      controlArray.controls[idx].get('igst').clearValidators();
      controlArray.controls[idx].get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('sgst').clearValidators();
      controlArray.controls[idx].get('sgst').updateValueAndValidity();
      controlArray.controls[idx].get('cgst').clearValidators();
      controlArray.controls[idx].get('cgst').updateValueAndValidity();
   

    }
    if (this.gsttypevalue == 1 && this.disabled == false) {
      this.addinvoice.get('sgst').clearValidators();
      this.addinvoice.get('sgst').updateValueAndValidity();
      this.addinvoice.get('cgst').clearValidators();
      this.addinvoice.get('cgst').updateValueAndValidity();
      controlArray.controls[idx].get('igst').clearValidators();
      controlArray.controls[idx].get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('sgst').clearValidators();
      controlArray.controls[idx].get('sgst').updateValueAndValidity();
      controlArray.controls[idx].get('cgst').clearValidators();
      controlArray.controls[idx].get('cgst').updateValueAndValidity();
    }



  }
  async getdevice(event ='') {
    this.getdevicel = await this.devices.selectdevice({like :event , bid :this.addinvoice.value["busid"]});
    // console.log("get device ", this.getdevicel);

  }

  async getmodel(event ='') {

    this.getmodell = await this.invoiceser.getmodel_edit({ makeid: this.dropdata, deviceid: this.dropdata1, like :event , bid :this.addinvoice.value["busid"] });
    this.getmodel2 = this.getmodell[0]
    // console.log("get model", this.getmodel2);

  }



  createForm() {
    this.addinvoice = new FormGroup({
      busid: new FormControl("", Validators.required),
      busaddr: new FormControl("", Validators.required),
      invno: new FormControl("", Validators.required),
      invdate: new FormControl("", Validators.required),
      vendorid: new FormControl("", Validators.required),
      vaddr: new FormControl("", Validators.required),
      sgst: new FormControl("", Validators.required),
      cgst: new FormControl("", Validators.required),
      igst: new FormControl("", Validators.required),
      gsttype: new FormControl("", Validators.required),
      invoiceid: new FormArray([this.createinvoice()]),
    });
  }
}