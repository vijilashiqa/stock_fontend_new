import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NbToastrService } from "@nebular/theme";
import { BusinessService } from "../../../_services/business.service";
import { DeviceService } from "../../../_services/device.service";
import { RoleservicesService } from "../../../_services/roleservices.service";

@Component({
  selector: 'ngx-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent {
  adddevice;
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
  getstbtypeg;editdevicel
  edithsnadd ={}
  pincode: any = [];
  area;
  count;
  listarea;
  getstates;result;
  dist;
  citylist;
  editflag = false;
  editdata = {};getbuss
  @Input() title: string;
  keyword = "name";getbusinessd
  alert: any;
  constructor(
    private activemodel: NgbActiveModal,
    private device: DeviceService,
    private route: Router,
    private bussiness :BusinessService,
    private toast: NbToastrService,
    public role: RoleservicesService,
  ) {}

  async ngOnInit() {
    console.log("item@@@@@@@@",this.item);
    await this.createForm();

    if(this.role.getroleid() > 888){
      await this.getBusiness()
      }
  else{
    this.adddevice.get('bid').setValue(this.role.getbusiness());
  }

    if(this.item) await this.editdevice();
  }

  async adddevicesf() {
    this.submit = true;
    if (this.adddevice.invalid) {
      return;
    }
    let method = this.item ? "editdevice" : "adddevice";
    if (this.item) this.adddevice.value["deviceid"] = this.item;
    let result = await this.device[method](this.adddevice.value);
    console.log("add@@@",this.adddevice.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("",result[0]["msg"], );
      this.close();
      this.route.navigate(["/pages/vendor/list-device"]);
    } else {
      this.toast.warning("",result[0]["msg"]);
    } 
  }

  async getBusiness(event ='') {
    this.getbusinessd = await this.bussiness.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
  }

async editdevice() {
    this.editdevicel = await this.device.getdevice({deviceid: this.item })
    console.log('edit data%%%%%%%%%%%%%%', this.editdevicel)
    await this.createForm();
  }

  close() {
    this.activemodel.close();
  }
  createForm() {
    this.adddevice = new FormGroup({
      devicename: new FormControl(this.editdevicel?.["devicename"] || "", Validators.required),
      bid : new FormControl(this.editdevicel?.["bid"] || "", Validators.required)
    });
  }
}