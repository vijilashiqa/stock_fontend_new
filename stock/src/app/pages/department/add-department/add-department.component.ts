import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NbToastrService } from "@nebular/theme";
import { BusinessService } from "../../_services/business.service";
import { DeviceService } from "../../_services/device.service";
import { RoleservicesService } from "../../_services/roleservices.service";
import { DepartmentService } from "../../_services/department.service";


@Component({
  selector: 'ngx-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent {
  adddepartment;
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
  getstbtypeg;editdepartment
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
    private departmentser: DepartmentService,
    private route: Router,
    private bussiness :BusinessService,
    private toast: NbToastrService,
    public role: RoleservicesService,
  ) {}

  async ngOnInit() {
    // console.log("item@@@@@@@@",this.item);
    await this.createForm();
    if(this.role.getroleid() > 888){
      await this.getBusiness()
      }
  else{
    console.log("dfasdfasdfsdfasdfsadf",this.role.getbusiness());
    
    this.adddepartment.get('busid').setValue(this.role.getbusiness());
  }
    if(this.item) await this.editdepartmentfun();
  }

  async adddepartmentsf() {
    this.submit = true;
    if (this.adddepartment.invalid) {
      return;
    }
    let method = this.item ? "editdepartment" : "adddepartment";
    if (this.item) this.adddepartment.value["id"] = this.item;
    let result = await this.departmentser[method](this.adddepartment.value);
    console.log("add@@@",this.adddepartment.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("",result[0]["msg"], );
      this.close();
      this.route.navigate(["/pages/department/list-department"]);
    } else {
      this.toast.warning("",result[0]["msg"]);
    } 
  }

  async getBusiness(event='') {
    this.getbusinessd = await this.bussiness.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
  }

async editdepartmentfun() {
    this.editdepartment = await this.departmentser.getdepartment({id: this.item })
    console.log('edit data%%%%%%%%%%%%%%', this.editdepartment)
    await this.createForm();
  }

  close() {
    this.activemodel.close();
  }
  createForm() {
    this.adddepartment = new FormGroup({
      busid :new FormControl(this.editdepartment?.["busid"] || "", Validators.required),
      depname: new FormControl(this.editdepartment?.["depname"] || "", Validators.required),
    });
  }
}