import { Component, OnInit } from '@angular/core';
import {  VendorService } from '../../../_services/vendor.service';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { SerialnoService } from '../../../_services/serialno.service';

@Component({
  selector: 'ngx-list-serial',
  templateUrl: './list-serial.component.html',
  styleUrls: ['./list-serial.component.scss']
})
export class ListSerialComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listserialnol;data;count;loading=false;
  constructor(
    private serialser: SerialnoService,
    private pageservice :PagerService,
    public role: RoleservicesService,
  ) { }

 async ngOnInit() {
  await this.initiallist();
  }

  async initiallist() {
    this.loading=true;
    this.listserialnol = await this.serialser.listserialno({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('list serial', this.listserialnol)
    this.data = this.listserialnol[0];
    this.count = this.listserialnol[1].count;
    console.log("cont in list serial  no", this.count);
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

  setPage() {
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }
}
