import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from '../../../_services/business.service';
import { NbToastrService } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  submit: boolean;
  editable: boolean = false;
  editdata = {};
  id;
  editflag = false;
  data;
  AddUserForm;getbuss

  constructor(
  
    private route: Router,
    private bussiness :BusinessService,
    private user :UserService,
    private toast: NbToastrService
  ) {}

  async ngOnInit() {
    await this.createForm();
    await this.getBusiness();
    // await this.getdistrict();
  }


async addUser(){
  console.log("add@@@@@")
  const invalid = [];
  const control = this.AddUserForm.controls;
  for (const name in control) {
    if (control[name].invalid) {
      invalid.push(name);
    }
  }
  console.log('invalid', invalid);
  this.submit = true;
  if (this.AddUserForm.invalid) {
    return;
  }
  let result = await this.user.adduser(this.AddUserForm.value);
  if (result && result[0].err_code == 0) {
    this.toast.success("",result[0]["msg"]);
    this.route.navigate(["/pages/admin/list-user"]);
    console.log("add vendor ", result);
  } else {
    this.toast.warning("",result[0]["msg"]);
  }
}

getbusinessd;

async getBusiness() {
  this.getbusinessd = await this.bussiness.getbusiness({});
  this.getbuss = this.getbusinessd[0];
  // console.log("get business ", this.getbuss);
}



createForm() {
  this.AddUserForm = new FormGroup({
    bid: new FormControl("", Validators.required),
    urole:new FormControl("", Validators.required),
    loginid: new FormControl("", Validators.required),
    pwd: new FormControl("", Validators.required),
    fname: new FormControl("", Validators.required),
    mobile : new FormControl("", Validators.required),
    email : new FormControl("",  Validators.required),
    address : new FormControl("", Validators.required),
  });
}
}