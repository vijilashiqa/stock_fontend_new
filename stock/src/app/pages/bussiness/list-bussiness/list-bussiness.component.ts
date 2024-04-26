import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../_services/pager.service';
import { RoleservicesService } from '../../_services/roleservices.service';
import { BusinessService } from '../../_services/business.service';

@Component({
  selector: 'ngx-list-bussiness',
  templateUrl: './list-bussiness.component.html',
  styleUrls: ['./list-bussiness.component.scss']
})
export class ListBussinessComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;broadcastlist;data;count;loading=false;
  constructor(
    private pageservice :PagerService,
    private business :BusinessService,
    public role: RoleservicesService,
  ) { }

 async ngOnInit() {
  // if(this.role.getroleid() > 888 )
  await this.initiallist();


  console.log("get role id @@@@@@@@@@@", this.role.getroleid());
  }

  async initiallist() {
    this.loading=true;
    this.broadcastlist = await this.business.listbusiness({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('area=====', this.broadcastlist)
    this.data = this.broadcastlist[0];
    this.count = this.broadcastlist[1].count;
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