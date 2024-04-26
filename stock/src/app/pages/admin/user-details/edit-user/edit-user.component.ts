import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../_services/business.service';
import { NbToastrService } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  submit: boolean;
  editable: boolean = false;
  editdata = {};
  id;listdata
  editflag = false;getdata;
  data;
  edituserForm;getbuss;getbusinessd;

  constructor(
  
    private route: Router,
    private bussiness :BusinessService,
    private user :UserService,
    private aRoute: ActivatedRoute,
    private toast: NbToastrService
  ) {}

  async ngOnInit() {
    this.id = this.aRoute.snapshot.queryParams.id;
    console.log("id@@@@@@@@@@@@@@@@", this.id);

    await this.createForm();
    await this.getedit();
    await this.getBusiness();
   
  }


async editUserf(){
  console.log("add@@@@@")
  const invalid = [];
  const control = this.edituserForm.controls;
  for (const name in control) {
    if (control[name].invalid) {
      invalid.push(name);
    }
  }
  console.log('invalid', invalid);
  this.submit = true;
  if (this.edituserForm.invalid) {
    return;
  }
  this.edituserForm.value["id"] = this.id;
  let result = await this.user.edituser(this.edituserForm.value);
  if (result && result[0].err_code == 0) {
    this.toast.success("",result[0]["msg"]);
    this.route.navigate(["/pages/admin/list-user"]);
    console.log("add vendor ", result);
  } else {
    this.toast.warning("",result[0]["msg"]);
  }
}



async getedit(){

this.getdata = await this.user.getuser({id:this.id})
this.listdata=this.getdata[0];

await this.createForm();
// this.disabled = !this.disabled;

console.log("get data", this.listdata)

}

async getBusiness() {
  this.getbusinessd = await this.bussiness.getbusiness({});
  this.getbuss = this.getbusinessd[0];
  console.log("get business ", this.getbuss);
}



createForm() {
  this.edituserForm = new FormGroup({
    bid: new FormControl(this.listdata?.["bid"] || "",Validators.required),
    urole:new FormControl(this.listdata?.["urole"] || "",Validators.required),
    loginid: new FormControl(this.listdata?.["loginid"] || "", Validators.required),
    pwd: new FormControl(''),
    fname: new FormControl(this.listdata?.["fname"] || "", Validators.required),
    mobile : new FormControl(this.listdata?.["mobile"] || "", Validators.required),
    email : new FormControl(this.listdata?.["email"] || "", Validators.required),
    address : new FormControl(this.listdata?.["address"] || "", Validators.required),
  });
}
}