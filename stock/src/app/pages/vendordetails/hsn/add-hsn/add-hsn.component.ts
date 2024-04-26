import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HsnService } from "../../../_services/hsn.service";

import {
  NbToastrService,
} from '@nebular/theme';
@Component({
  selector: "ngx-add-hsn",
  templateUrl: "./add-hsn.component.html",
  styleUrls: ["./add-hsn.component.scss"],
})
export class AddHsnComponent {
  AddhsnForm;
  modalHeader: string;
  submit: boolean = false;
  item;
  listhdcas;
  state: any = [];
  district: any = [];
  city: any = [];
  listpincode: any;
  listhead;
  listmake;
  getstbtypeg;
  edithsnadd ={}
  pincode: any = [];
  area;
  count;
  listarea;
  getstates;result;
  dist;
  citylist;
  editflag = false;
  editdata = {};
  @Input() title: string;
  keyword = "name";
  alert: any;
  constructor(
    private activemodel: NgbActiveModal,
    private hsn: HsnService,
    private route: Router,
    private toast: NbToastrService
  ) {}

  async ngOnInit() {
    console.log("item@@@@@@@@",this.item);
    await this.createForm();
    if (this.item) {

    await this.editaddhsn();
  }
}

  async addhsn() {
    this.submit = true;
    if (this.AddhsnForm.invalid) {
      return;
    }
    let method = this.item ? "edithsn" : "addhsn";
    if (this.item) this.AddhsnForm.value["id"] = this.item;
    let result = await this.hsn[method](this.AddhsnForm.value);
    console.log("add@@@",this.AddhsnForm.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("",result[0]["msg"], );
      this.close();
      this.route.navigate(["/pages/vendor/list-hsn"]);
    } else {
      this.toast.warning("",result[0]["msg"]);
    } 
  }


async editaddhsn() {
    this.edithsnadd = await this.hsn.gethsn({id: this.item })
    console.log('edit data%%%%%%%%%%%%%%', this.edithsnadd)
    await this.createForm();
  }

  close() {
    this.activemodel.close();
  }
  createForm() {
    this.AddhsnForm = new FormGroup({
      mhsn: new FormControl(this.edithsnadd?.["mhsn"] || "", Validators.required),
    });
  }
}
