import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


import {
  NbToastrService,
} from '@nebular/theme';
import { HubService } from "../../../_services/hub.service";
import { StateService } from "../../../_services/state.service";
import { DistrictService } from "../../../_services/district.service";
import { DepartmentService } from "../../../_services/department.service";
import { BusinessService } from "../../../_services/business.service";
import { RoleservicesService } from "../../../_services/roleservices.service";

@Component({
  selector: 'ngx-add-hub',
  templateUrl: './add-hub.component.html',
  styleUrls: ['./add-hub.component.scss']
})
export class AddHubComponent {
  Addhubform;

  submit: boolean = false;
  id;
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
  count;gethublist;getdepartment
  listarea;
  getstates;result;
  dist;
  citylist;getbusinessd;getbuss
  editflag = false;
  editdata = {};
  @Input() title: string;
  keyword = "name";
  alert: any;edithub1
  constructor(
    private hub: HubService,
    private route: Router,
    private stateser: StateService,
    private districtser: DistrictService,
    private toast: NbToastrService,
    private bussiness :BusinessService,
    private aRoute: ActivatedRoute,
    public role: RoleservicesService,
    private departmentser : DepartmentService
  ) {}

  async ngOnInit() {
    this.id = this.aRoute.snapshot.queryParams["id"];
    console.log("id@@@@@@@@",this.id);
    await this.createForm();
    if(this.role.getroleid() > 888){
      await this.getBusiness();
      // await this.gethub();
      await this.getstate();
      // await this.getdepartmentf()
      // await this.getdistrict();
      }
  else
  {
    console.log("this.role.getbusiness()",this.role.getbusiness());
    this.Addhubform.get('bid').setValue(this.role.getbusiness());
    await this.getdepartmentf()
  }

  await this.getstate();
    if (this.id) {
    await this.editaddhub();
    // await this.gethub();
    await this.getstate();
    await this.getdepartmentf()
    await this.getdistrict();
  }
}

  async addhubf() {
    this.submit = true;
    if (this.Addhubform.invalid) {
      return;
    }
    let method = this.id ? "edithub" : "addhub";
    if (this.id) this.Addhubform.value["id"] = this.id;
    let result = await this.hub[method](this.Addhubform.value);
    console.log("add@@@ HUB",this.Addhubform.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("",result[0]["msg"], );
      // this.close();
      this.route.navigate(["/pages/Geo-details/list-hub"]);
    } else {
      this.toast.warning("",result[0]["msg"]);
    } 
  }







  

  // async gethub(even=''){


  //   this.gethublist = await this.hubservices.gethub({like :event})
  //   console.log("GET HUB ",this.gethublist);
    

  // }
  

async editaddhub() {
    this.edithubadd = await this.hub.gethub({id: this.id })
    console.log('edit data%%%%%%%%%%%%%%', this.edithubadd[0])
this.edithub1=this.edithubadd[0];
    await this.createForm();
  }


  

  async getBusiness(event ='') {
    this.getbusinessd = await this.bussiness.getbusiness({like:event});
    this.getbuss = this.getbusinessd[0];
    console.log("bussiness",this.getbuss);
    
  }

  async getdepartmentf(event =''){

    this.getdepartment =await this.departmentser.selectdepartment({like :event ,busid :this.Addhubform.value["bid"]})
  
    console.log("get deprtment", this.getdepartment);
    
  }

  async getstate($event = "") {
    this.getstates = await this.stateser.getstate({ like: $event });
    console.log("state", this.getstates);
  }



  async getdistrict($event = "") {
    this.dist = await this.districtser.getdistrict({
      state_fk: this.Addhubform.value["stateid"],
      like: $event,
    });
  }

  
  createForm() {
    this.Addhubform = new FormGroup({
      hubname: new FormControl(this.edithub1?.["hubname"] || "", Validators.required),
      bid:new FormControl(this.edithub1?.["bid"] || "", Validators.required),
      desc :new FormControl(this.edithub1?.["descs"] || "", Validators.required),
      depid:new FormControl(this.edithub1?.["depid"] || "", Validators.required),
      hubincname:new FormControl(this.edithub1?.["hubincname"] || "", Validators.required),
      hubmobile: new FormControl(this.edithub1?.["hubmobile"] || "", Validators.required),
      hubaddr :new FormControl(this.edithub1?.["hubaddr"] || "", Validators.required),
      stateid:new FormControl(this.edithub1?.["stateid"] || "", Validators.required),
      destid: new FormControl(this.edithub1?.["destid"] || "", Validators.required),

    });
  }
}