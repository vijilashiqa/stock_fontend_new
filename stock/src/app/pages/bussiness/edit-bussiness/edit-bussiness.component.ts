import { Component } from "@angular/core";

import { NbToastrService } from "@nebular/theme";
import { ActivatedRoute, Router } from "@angular/router";
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
  selector: "ngx-edit-bussiness",
  templateUrl: "./edit-bussiness.component.html",
  styleUrls: ["./edit-bussiness.component.scss"],
})
export class EditBussinessComponent {
  submit: boolean = false;
  EditBusiness;
  getvendorlist;
  getmodellist;
  locationlist;
  gethsn;
  editfirstarray;
  vendor;
  editbankd;
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
  editadd;
  varb;
  assignadd;
  assignbank;
  dist;
  citylist;
  listarea;
  cunt;
  filtro;
  dropdata;

  constructor(
    private _fb: FormBuilder,
    private Bussiness: BusinessService,
    private toast: NbToastrService,
    private route: Router,
    private stateser: StateService,
    private districtser: DistrictService,
    public role: RoleservicesService,
    private aRoute: ActivatedRoute
  ) {
    this.getstate();
    this.getdistrict();
  }

  async ngOnInit() {
    this.id = this.aRoute.snapshot.queryParams.id;
    console.log("id@@@@@@@@@@@@@@@@", this.id);

    await this.createForm();
    await this.edit();
    await this.editbank();
    await this.getaddress();
  }

  async editbuss() {
    console.log("@@@@@@@@@@@@@");

    const invalid = [];
    const control = this.EditBusiness.controls;
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
      }
    }
    // console.log('invalid', invalid);
    this.submit = true;
    if (this.EditBusiness.invalid) {
      return;
    }
    if (this.id) this.EditBusiness.value["id"] = this.id;
    let result = await this.Bussiness.businessedit(this.EditBusiness.value);
    console.log("push data", this.EditBusiness.value);

    if (result && result[0].err_code == 0) {
      this.toast.success( "", result[0]["msg"]);
      this.route.navigate(["/pages/business/list-business"]);
      console.log("add vendor ", result);
    } else {
      this.toast.warning( "",result[0]["msg"]);
    }
  }

  async edit() {
    this.editdata = await this.Bussiness.getbusinessedit({ id: this.id });
    console.log("edit @@@@@@@@@@", this.editdata);
    this.varb = this.editdata[0][0];
    await this.createForm();
  }

  async getaddress() {
    this.editadd = await this.Bussiness.getbusinessaddredit({ id: this.id });
    this.assignadd = this.editadd && this.editadd[0];
    this.count = this.editadd[1].cnt;
console.log("count&&&&&&&&&&&",this.count);

    console.log("edit address", this.assignadd);
    for (let item of this.assignadd) {
      console.log("item status *****", item);

      this.addaddress(
        item.bagstno,
        item.bastateid,
        item.badistid,
        item.baaddress,
        item.baaddrname,
        item.bastatus,
        item.id,
        item.bid
      );

      console.log("item ADDRESS @@@@@@@@@", item.baaddrname);
    }
  }


  changestate( index: number) {
    // console.log("chang",index);
    
    this.stockinid.at(index).get('badistid').setValue('');
  }


  changestates(){

    this.EditBusiness.controls.distid.setValue("");
  }



  addaddress(
    bagstno = "",
    bastateid = 0,
    badistid = 0,
    baaddress = "",
    baaddrname = 0,
    bastatus = 0,
    id = 0,
    bid = 0
  ) {
    console.log("daa@@@@@@@", bagstno);
    this.stockinid.push(
      this.createaddress(
        bagstno,
        bastateid,
        badistid,
        baaddress,
        baaddrname,
        bastatus,
        id,
        bid
      )
    );
  }

  createaddress(
    bagstno = "",
    bastateid = 0,
    badistid = 0,
    baaddress = "",
    baaddrname = 0,
    bastatus = 0,
    id = 0,
    bid = 0
  ): FormGroup {
    console.log(
      "statte inside",
      bastateid,
      "badistid",
      badistid,
      "dist",
      this.dist
    );
    return this._fb.group({
      bagstno: [bagstno || "" , Validators.required],
      bastateid: [bastateid || "" , Validators.required],
      badistid: [badistid || "" , Validators.required],
      baaddress: [baaddress || "", Validators.required],
      baaddrname: [baaddrname || "" , Validators.required],
      bastatus: [bastatus ? bastatus : "" || ""],
      id: id ? id : "",
      bid: bid ? bid : "",
    });
  }
  deleteaddress(index: number) {
    this.stockinid.removeAt(index);
  }

  async editbank() {
    this.editbankd = await this.Bussiness.getbusinessbankedit({
      id: this.id,
    });
    console.log("edit bank", this.editbankd);
    this.assignbank = this.editbankd[0];
    this.cunt = this.editbankd[1].cnt;
    console.log("**************", this.cunt , "==================",this.cunt -1);
    for (let data of this.assignbank) {
      console.log("item bank  id*****", data.id);
      this.addBankdetails(
        data.bank,
        data.bbname,
        data.bbacctno,
        data.bbifsc,
        data.id,
        data.bid,
        data.bstatus
      );
      let ddd = data.id;
      console.log("#####################", ddd);
    }
  }

  get stockinid(): FormArray {
    return this.EditBusiness.get("stockinid") as FormArray;
  }

  get bankdetails(): FormArray {
    return this.EditBusiness.get("bankdetails") as FormArray;
  }

  addBankdetails(
    bank = 0,
    bbname = "",
    bbacctno = 0,
    bbifsc = "",
    id = 0,
    bid = 0,
    bstatus = 0
  ) {
    this.bankdetails.push(
      this.createBankdetails(bank, bbname, bbacctno, bbifsc, id, bid, bstatus)
    );
  }

  deleteBankdetails(index: number) {
    this.bankdetails.removeAt(index);
  }

  createBankdetails(
    bank = 0,
    bbname = "",
    bbacctno = 0,
    bbifsc = "",
    id = 0,
    bid = 0,
    bstatus = 0
  ): FormGroup {
    return this._fb.group({
      bank: [bank || " " , Validators.required],
      bbname: [bbname || "" , Validators.required],
      bbacctno: [bbacctno || "" , Validators.required],
      bbifsc: [bbifsc || "" , Validators.required],
      id: id ? id : "",
      bid: bid ? bid : "",
      bstatus: [bstatus ? bstatus : ""],
    });
  }

  async getstate($event = "") {
    this.getstates = await this.stateser.getstate({ like: $event });
    console.log("state", this.getstates);
  }

  dropdown($event) {
    this.dropdata = $event.state_pk;
    console.log("drop", this.dropdata);
    this.getdistrict("");
  }

  async getdistrict($event = "") {
    console.log("ddddd", this.dropdata);

    this.dist = await this.districtser.getdistrict({
      state_fk: this.dropdata,
      like: $event,
    });
    console.log("district", this.dist);
  }

  changeclear(...data) {
    for (let i of data) {
      this.EditBusiness.controls[i].setValue("");
    }
  }

  createForm() {
    this.EditBusiness = new FormGroup({
      bname: new FormControl(this.varb?.["bname"] || "", Validators.required),
      pan: new FormControl(this.varb?.["pan"] || "", Validators.required),
      bphoneno: new FormControl(
        this.varb?.["bphoneno"] || "",
        Validators.required
      ),
      bemail: new FormControl(this.varb?.["bemail"] || "", Validators.required),
      tinno: new FormControl(this.varb?.["tinno"] || "", Validators.required),
      stateid: new FormControl(
        this.varb?.["stateid"] || "",
        Validators.required
      ),
      distid: new FormControl(this.varb?.["distid"] || "", Validators.required),
      stockinid: new FormArray([]),
      bankdetails: new FormArray([]),
    });
  }
}
