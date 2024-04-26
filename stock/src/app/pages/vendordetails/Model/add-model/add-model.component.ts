import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MakeService } from "../../../_services/make.service";
import { NbToastrService } from "@nebular/theme";
import { BusinessService } from "../../../_services/business.service";
import { DeviceService } from "../../../_services/device.service";
import { ModelService } from "../../../_services/model.service";


@Component({
  selector: 'ngx-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent {
  addmodel;
  submit: boolean = false;
  item;
  count;
  editmodell;
  getmakel;
  getdevicel;
  getbuss;
  getbusinessd
  @Input() title: string;
  constructor(
    private activemodel: NgbActiveModal,
    private make: MakeService,
    private models: ModelService,
    private route: Router,
    private devices: DeviceService,
    private bussiness: BusinessService,
    private toast: NbToastrService
  ) { }

  async ngOnInit() {
    console.log("item@@@@@@@@", this.item);
    await this.createForm();
    await this.getBusiness();
    await this.getmake();
    await this.getdevice();
    if(this.item) await this.editmodel();

  }

  async addhsn() {
    this.submit = true;
    if (this.addmodel.invalid) {
      return;
    }
    let method = this.item ? "editmodel" : "addmodel";
    if (this.item) this.addmodel.value["modelid"] = this.item;
    let result = await this.models[method](this.addmodel.value);
    console.log("add@@@", this.addmodel.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("", result[0]["msg"],);
      this.close();
      this.route.navigate(["/pages/vendor/list-model"]);
    } else {
      this.toast.warning("", result[0]["msg"]);
    }
  }

  async getBusiness() {
    this.getbusinessd = await this.bussiness.getbusiness({});
    this.getbuss = this.getbusinessd[0];
  }



  async getmake() {
    if((this.item) || this.addmodel.value["bid"] )   {
    this.getmakel = await this.make.selectmake({});
    console.log("get make ", this.getmakel);
    }
  }


  async getdevice() {
    if((this.item) || this.addmodel.value["bid"] ) 
    this.getdevicel = await this.devices.selectdevice({});
    console.log("get device ", this.getdevicel);
    // }
  }
  async editmodel() {
    this.editmodell = await this.models.getmodel({ modelid: this.item })
    console.log('edit data%%%%%%%%%%%%%%', this.editmodell)
    await this.createForm();
  }

  close() {
    this.activemodel.close();
  }
  createForm() {
    this.addmodel = new FormGroup({
      makeid: new FormControl(this.editmodell?.["makeid"] || "", Validators.required),
      deviceid: new FormControl(this.editmodell?.["deviceid"] || "", Validators.required),
      bid: new FormControl(this.editmodell?.["bid"] || "", Validators.required),
      modelname: new FormControl(this.editmodell?.["modelname"] || "", Validators.required),
    });
  }
}