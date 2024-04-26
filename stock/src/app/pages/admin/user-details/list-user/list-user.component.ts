import { Component } from '@angular/core';
import { PagerService } from '../../../_services/pager.service';
import { UserService } from '../../../_services/user.service';
import { RoleservicesService } from '../../../_services/roleservices.service';

@Component({
  selector: 'ngx-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listusers;data;count;loading=false;
  constructor(
    private pageservice :PagerService,
    private user :UserService,
    public role:RoleservicesService
  
  ) { }

 async ngOnInit() {
  await this.initiallist();
  }

  async initiallist() {
    this.loading=true;
    this.listusers = await this.user.listuser({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('area=====', this.listusers)
    this.data = this.listusers[0];
    this.count = this.listusers[1].count;
    this.loading=false;
    this.setPage();

  }
  Addvendor(){}

  
  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.initiallist();
    };
  }

  setPage() {
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }

}