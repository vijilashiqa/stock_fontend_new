import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagerService } from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { MenuroleService } from '../../../_services/menurole.service';



@Component({
  selector: 'ngx-list-menurole',
  templateUrl: './list-menurole.component.html',
  styleUrls: ['./list-menurole.component.scss']
})
export class ListMenuroleComponent {
  data: any = []; pager: any = {}; 
  head: any = []; head_opt = ''; opt_type = ''; opt_name = ''; status = ''; opt: any = [];
  operator_name = '';   user: any; getuser;loading =false; fname = '';loginid=''
  page: number = 1; pagedItems: any = []; limit = 25;getcitylist;count;getfullnamel;

  constructor(
     private menurole: MenuroleService,
     private pageservice: PagerService,  
     private router: Router,
     public  role:RoleservicesService,
    ) 
     { }

  async ngOnInit() {
  await  this.initiallist();
    await  this.getfullnamef()
    console.log("get role id @@@@@@@@@@@", this.role.getroleid());

  }
  async initiallist() {
    this.loading=true;
    this.getuser = await this.menurole.listurole({index:(this.page - 1) * this.limit,limit:this.limit });
    console.log('gestuser*****', this.getuser)
    this.data = this.getuser[0];
    this.count = this.getuser[1].count;
    this.loading=false;
    this.setPage();

  }
  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.initiallist();
    };
  }


 async getfullnamef(){
    this.getfullnamel = await this.menurole.getfullname({});
    console.log("get full name ",this.getfullnamel);
    

  }

  setPage() {
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }
  edit(item) {
    localStorage.setItem('geturole', JSON.stringify(item));
    this.router.navigate(['/pages/admin/edit-admin']);
  }
}