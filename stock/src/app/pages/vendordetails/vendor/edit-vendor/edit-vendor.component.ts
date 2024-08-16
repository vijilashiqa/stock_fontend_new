import { Component, OnInit } from "@angular/core";

import { NbToastrService } from "@nebular/theme";
import { ActivatedRoute, Router } from "@angular/router";
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
  selector: "ngx-edit-vendor",
  templateUrl: "./edit-vendor.component.html",
  styleUrls: ["./edit-vendor.component.scss"],
})
export class EditVendorComponent {
  submit: boolean = false;
  editvendor;
  getvendorlist;
  getmodellist;
  locationlist;
  gethsn;
  varb;
  editfirstarray;
  vendor;
  loc;count1
  STB;
  listhead;
  editdata = {};
  id;
  editadd;
  editflag = false;
  editable: boolean = false;
  materialArray;
  count;
  getstates;
  assignadd;
  dist;data1
  editbankd;
  citylist;
  listarea;
  assignbank;getbusines;getbusines1;
  filtro;
  dropdata;

  constructor(
    private _fb: FormBuilder,
    private vendorservices: VendorService,
    private toast: NbToastrService,
    private route: Router,
    private businesser :BusinessService,
    private stateser: StateService,
    private districtser: DistrictService,
    public role: RoleservicesService,
    private aRoute: ActivatedRoute,
    private Bussiness :BusinessService
  ) {
    this.getstate();
    this.getdistrict();
  }

  async ngOnInit() {
    this.id = this.aRoute.snapshot.queryParams.id;
    console.log("id@@@@@@@@@@@@@@@@", this.id);
    await this.createForm();
    await this.edit();
    if(this.role.getroleid() > 888){
      await this.getbusiness('')
      }
  else{
    this.editvendor.get('bid').setValue(this.role.getbusiness());
  }
    await this.editbank();
    await this.getaddress();
    await this.getbanf();
  }

  async editstockIn() {
    this.submit = true;
    console.log("@@@@@@@@@@@@@");
    const invalid = [];
    const control = this.editvendor.controls;
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
      }
    }
    console.log('invalid', invalid);
    
    if (this.editvendor.invalid) {
      return;
    }
    if (this.id) this.editvendor.value["id"] = this.id;
    let result = await this.vendorservices.vendoredit(this.editvendor.value);
    // console.log("push data",this.editvendor.value);
    
    if (result && result[0].err_code == 0) {
      this.toast.success("",result[0]["msg"]);
      this.route.navigate(["/pages/vendor/ListVendor"]);
      // console.log("add vendor ", result);
    } else {
      this.toast.warning("",result[0]["msg"]);
    }
  }

  async edit() {
    this.editdata = await this.vendorservices.getvendoredit({ id: this.id });
    // console.log("edit @@@@@@@@@@", this.editdata);
    this.varb = this.editdata[0][0];
    await this.createForm();
  }
  async getaddress() {
    this.editadd = await this.vendorservices.getvendoraddreditd({id: this.id,});
    this.assignadd = this.editadd && this.editadd[0];
    this.count1=this.editadd[1].cnt;
    console.log("count address", this.count1);
    for (let item of this.assignadd) {
      // console.log("item status *****", item);
      this.addaddress(
        item.gst_no,
        item.address,
        item.state,
        item.dist,
        item.addrname,
        item.pincode,
        item.vastatus,
        item.id,
        item.vid
      );

      console.log("item state @@@@@@@@@", item.vastatus);
    }
  }

  async editbank() {
    this.editbankd = await this.vendorservices.getvendorbankedit({
      id: this.id,
    });
    // console.log("edit bank", this.editbankd);
    this.assignbank = this.editbankd[0];
    // console.log("%%%%%%%%%%%",this.editbankd)
    this.count=this.editbankd[1].cnt;

// this. data1 =this.count++;

 console.log("data  bank ++++++++++++++++",this.count);
    


    for (let data of this.assignbank) {
      // console.log("item bank  id*****", data.id);
      this.addBankdetails(data.bank, data.vbname, data.vbacctno, data.vbifsc, data.id,data.vid,data.cbstatus);
    //  let ddd = data.id;
      // console.log("#####################", ddd);
    }
  }

  banklist;banklist1


  async getbanf(){

    this.banklist = await this.Bussiness.getbank({})

    this.banklist1= this.banklist[0]
console.log("bank list ", this.banklist);

  }

  
  changestate( index: number) {
    this.stockinid.at(index).get('district').setValue('');
  }


  get stockinid(): FormArray {
    return this.editvendor.get("stockinid") as FormArray;
  }

  addaddress(
    gstno = "",
    addresname = "",
    state = 0,
    district = 0,
    address = 0,
    pincode = 0,
    vastatus=0,
    id=0,
    vid =0,
    
  ) {
    this.stockinid.push(this.createaddress(gstno, addresname, state, district, address, pincode,vastatus ,id,vid));
  }


  
  
  createaddress(
    gstno = "",
    addresname = "",
    state = 0,
    district = 0,
    address = 0,
    pincode = 0,
    vastatus =0,
    id=0,vid=0,
 
  ): FormGroup {
    // console.log(
    //   "statte inside",
    //   state,
    //   "district",
    //   district,
    //   "dist",
    //   this.dist
    // );
    return this._fb.group({
      gstno: [gstno || "" ,Validators.required],
      addresname: [addresname || "" ,Validators.required],
      state: [state || "" ,Validators.required],
      district: [district || "" ,Validators.required],
      address: [address || "" ,Validators.required],
      pincode: [pincode || "" ,Validators.required],
      vastatus :  [ vastatus ? vastatus : "" || "" ],
      id:id ? id : "",
      vid:vid ? vid : "",
    });
  }
  deleteaddress(index: number) {
    this.stockinid.removeAt(index);
  }

  get bankdetails(): FormArray {
    return this.editvendor.get("bankdetails") as FormArray;
  }

  addBankdetails(bank = 0, vbname = "", vbacctno = 0, vbifsc = "" , id=0,vid=0,    vbstatus=0) {
    this.bankdetails.push(
      this.createBankdetails(bank, vbname, vbacctno, vbifsc ,id,vid,   vbstatus)
    );
  }

  deleteBankdetails(index: number) {
    this.bankdetails.removeAt(index);
  }

  createBankdetails(
    bank = 0,
    vbname = "",
    vbacctno = 0,
    vbifsc = "",
    id=0,
    vid=0,
    vbstatus=0
  ): FormGroup {
    return this._fb.group({
      bank: [bank || "" ,Validators.required],
      vbname: [vbname || "",Validators.required],
      vbacctno: [vbacctno || "",Validators.required],
      vbifsc: [vbifsc || "",Validators.required],
      id:id ? id : '',
      vid:vid ? vid : '',
      vbstatus:[vbstatus ?vbstatus  : '']
    });
  }

  async getstate($event = "") {
    this.getstates = await this.stateser.getstate({ like: $event });
    // console.log("state", this.getstates);
  }

  dropdown($event) {
    this.dropdata = $event.state_pk;
    // console.log("drop", this.dropdata);
    this.getdistrict("");
  }

  async getdistrict($event = "") {
 //   console.log("ddddd", this.dropdata);

    this.dist = await this.districtser.getdistrict({
      state_fk: this.dropdata,
      like: $event,
    });
    // console.log("district", this.dist);
  }

  changeclear(...data) {
    for (let i of data) {
      this.editvendor.controls[i].setValue("");
    }
  }
  async getbusiness($event){
    this.getbusines =await this.businesser.getbusiness({ like :$event});
    
    this.getbusines1=this.getbusines[0]
    // console.log("Business @@@",this.getbusines1);
      }


  createForm() {
    this.editvendor = new FormGroup({
      bid:  new FormControl(this.varb?.["bid"] || "", Validators.required),
      vcompany: new FormControl(
        this.varb?.["vcompany"] || "",
        Validators.required
      ),
      vname: new FormControl(this.varb?.["vname"] || "", Validators.required),
      vmobile: new FormControl(
        this.varb?.["vmobile"] || "",
        Validators.required
      ),
      vmail: new FormControl(this.varb?.["vmail"] || "", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      stockinid: new FormArray([]),
      bankdetails: new FormArray([]),
    });
  }
}
