import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


import {
  NbToastrService,
} from '@nebular/theme';
import { HubService } from "../../../_services/hub.service";

@Component({
  selector: 'ngx-add-hub',
  templateUrl: './add-hub.component.html',
  styleUrls: ['./add-hub.component.scss']
})
export class AddHubComponent {
  Addhubform;
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
  edithubadd ={}
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
    private hub: HubService,
    private route: Router,
    private toast: NbToastrService
  ) {}

  async ngOnInit() {
    console.log("item@@@@@@@@",this.item);
    await this.createForm();
    if (this.item) {

    await this.editaddhub();
  }
}

  async addhubf() {
    this.submit = true;
    if (this.Addhubform.invalid) {
      return;
    }
    let method = this.item ? "edithub" : "addhub";
    if (this.item) this.Addhubform.value["id"] = this.item;
    let result = await this.hub[method](this.Addhubform.value);
    console.log("add@@@ HUB",this.Addhubform.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("",result[0]["msg"], );
      this.close();
      this.route.navigate(["/pages/Geo-details/list-hub"]);
    } else {
      this.toast.warning("",result[0]["msg"]);
    } 
  }


async editaddhub() {
    this.edithubadd = await this.hub.gethub({id: this.item })
    console.log('edit data%%%%%%%%%%%%%%', this.edithubadd)
    await this.createForm();
  }

  close() {
    this.activemodel.close();
  }
  createForm() {
    this.Addhubform = new FormGroup({
      hubname: new FormControl(this.edithubadd?.["hubname"] || "", Validators.required),
      desc :new FormControl(this.edithubadd?.["descs"] || "", Validators.required),
    });
  }
}