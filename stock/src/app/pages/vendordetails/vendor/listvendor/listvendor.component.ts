
import { Component, OnInit } from '@angular/core';
import {  VendorService } from '../../../_services/vendor.service';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { BusinessService } from '../../../_services/business.service';
@Component({
  selector: 'ngx-listvendor',
  templateUrl: './listvendor.component.html',
  styleUrls: ['./listvendor.component.scss']
})
export class ListvendorComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listvendor;data;count;loading=false;search;busid;vendor;company
  constructor(
    private vendorservices: VendorService,
    private pageservice :PagerService,
    public role: RoleservicesService,
    private Business :BusinessService
  ) { }

 async ngOnInit() {
  await this.initiallist();
  // await this.getBusiness();
  // await this.getvendor()

  if(this.role.getroleid() > 888){
    await this.getBusiness()
    }
else{
  this.busid = this.role.getbusiness();
  console.log("after the ",this.busid);
  await this.getvendor();
  // await this.getmail()
}
  }

  async initiallist() {
    this.loading=true;
    this.listvendor = await this.vendorservices.listvendor({index:(this.page - 1) * this.limit,limit:this.limit , vcompany : this.company ,vname : this.vendor ,bid : this.busid });
    console.log('list vendor=====', this.listvendor)
    this.data = this.listvendor[0];
    this.count = this.listvendor[1].count;
// console.log("cont in list vendr", this.count)
    this.loading=false;
    this.setPage();

  }

  changebusiness(){
    this.company ='';
    this.vendor='';
  }

  changevendor(){

    this.company ='';
  }

  getbusinessd;getbuss
  async getBusiness(event ='') {
    this.getbusinessd = await this.Business.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
    console.log("get business ", this.getbuss);
  }

getvendorl;getven

  async getvendor(event ='') {
    this.getvendorl = await this.vendorservices.getvendor({like :event ,bid : this.busid});
    this.getven = this.getvendorl;
    console.log("get vendor ", this.getvendorl);
  }


  getcompanylist;getcompany

  async getcompanyf(event ='') {
    this.getcompanylist = await this.vendorservices.getcompany({like :event ,bid : this.busid});
    this.getcompany = this.getcompanylist;
    console.log("get vendor ", this.getcompany);
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