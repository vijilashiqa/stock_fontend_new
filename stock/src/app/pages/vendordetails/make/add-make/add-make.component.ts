
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MakeService } from "../../../_services/make.service";
import { NbToastrService } from "@nebular/theme";
import { BusinessService } from "../../../_services/business.service";
import { RoleservicesService } from "../../../_services/roleservices.service";


@Component({
  selector: 'ngx-add-make',
  templateUrl: './add-make.component.html',
  styleUrls: ['./add-make.component.scss']
})
export class AddMakeComponent {
  addmake;
  submit: boolean = false;
  item;
  listmake;
  editmake
  count;
  getbuss
  @Input() title: string;
  getbusinessd

  constructor(
    private activemodel: NgbActiveModal,
    private make: MakeService,
    private route: Router,
    private bussiness: BusinessService,
    private toast: NbToastrService,
    public role: RoleservicesService,
  ) { }

  async ngOnInit() {
    console.log("item@@@@@@@@", this.item);
    await this.createForm();
    if(this.role.getroleid() > 888){
      await this.getBusiness()
      }
  else{
    this.addmake.get('bid').setValue(this.role.getbusiness());
  }
    if(this.item){
      await this.editmaked();

    }
  }

  async addmakef() {
    this.submit = true;
    if (this.addmake.invalid) {
      return;
    }
    let method = this.item ? "editmake" : "addmake";
    if (this.item) this.addmake.value["makeid"] = this.item;
    let result = await this.make[method](this.addmake.value);
    console.log("add@@@", this.addmake.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("", result[0]["msg"],);
      this.close();
      this.route.navigate(["/pages/vendor/list-make"]);
    } else {
      this.toast.warning("", result[0]["msg"]);
    }
  }

  async getBusiness(event ='') {
    this.getbusinessd = await this.bussiness.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
  }

  async editmaked() {
    this.editmake = await this.make.getmake({ makeid: this.item })
    console.log('edit data%%%%%%%%%%%%%%', this.editmake)
    await this.createForm();
  }

  close() {
    this.activemodel.close();
  }
  createForm() {
    this.addmake = new FormGroup({
      makename: new FormControl(this.editmake?.["makename"] || "", Validators.required),
      bid: new FormControl(this.editmake?.["bid"] || "", Validators.required)
    });
  }
}
