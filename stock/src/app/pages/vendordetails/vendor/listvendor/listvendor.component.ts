
import { Component, OnInit } from '@angular/core';
import {  VendorService } from '../../../_services/vendor.service';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
@Component({
  selector: 'ngx-listvendor',
  templateUrl: './listvendor.component.html',
  styleUrls: ['./listvendor.component.scss']
})
export class ListvendorComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listvendor;data;count;loading=false;
  constructor(
    private vendorservices: VendorService,
    private pageservice :PagerService,
    public role: RoleservicesService,
  ) { }

 async ngOnInit() {
  await this.initiallist();
  }

  async initiallist() {
    this.loading=true;
    this.listvendor = await this.vendorservices.listvendor({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('list vendor=====', this.listvendor)
    this.data = this.listvendor[0];
    this.count = this.listvendor[1].count;
console.log("cont in list vendr", this.count);

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