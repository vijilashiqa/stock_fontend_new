import { Component, OnInit } from '@angular/core';
import {  VendorService } from '../../../_services/vendor.service';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { SerialnoService } from '../../../_services/serialno.service';
import { BusinessService } from '../../../_services/business.service';
import { InvoiceService } from '../../../_services/invoice.service';

@Component({
  selector: 'ngx-list-serial',
  templateUrl: './list-serial.component.html',
  styleUrls: ['./list-serial.component.scss']
})
export class ListSerialComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listserialnol;data;count;loading=false;search;busid;modelid;invoice;serialno
  constructor(
    private serialser: SerialnoService,
    private pageservice :PagerService,
    public role: RoleservicesService,
    public Business :BusinessService,
    private modelser :SerialnoService,
    private invoiceser :InvoiceService
  ) { }

 async ngOnInit() {
  await this.initiallist();
  // await this.getBusiness();


  if(this.role.getroleid() > 888){
    await this.getBusiness()
    }
else{
  this.busid = this.role.getbusiness();
  console.log("after the ",this.busid);
  await this.getitem();
  // await this.getinvoicef();
  await this.getserialnof()
}


  }




  clearbusiness(){

    this.modelid ='';
    this.serialno=''

  }

  async initiallist() {
    this.loading=true;
    this.listserialnol = await this.serialser.listserialno({index:(this.page - 1) * this.limit,
       limit:this.limit,
       serialno:this.serialno,
       modelid:this.modelid,
       busid :this.busid ,
       inv_itemid :this.invoice});
    console.log('list serial', this.listserialnol)
    this.data = this.listserialnol[0];
    this.count = this.listserialnol[1].count;
    console.log("cont in list serial  no", this.count);
    this.loading=false;
    this.setPage();

  }
  getbusinessd;getbuss
  async getBusiness(event ='') {
    this.getbusinessd = await this.Business.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
    console.log("get business ", this.getbuss);
  }

  getiteml;getiteml1
  async getitem() {
   
    this.getiteml = await this.invoiceser.getinvoice_item_edit({busid :this.busid })
    this.getiteml1 = this.getiteml[0];
    console.log("invoice ", this.getiteml1);
  }

  getinvoice;getinvoicelist
  async getinvoicef(event ='') {
    this.getinvoicelist = await this.invoiceser.getinvoice({like :event, bid :this.busid});
    this.getinvoice = this.getinvoicelist[0];
    console.log("get invoice ", this.getinvoice);
  }


  getserialno;getseriallist
  async getserialnof(event ='') {
    this.getseriallist = await this.modelser.selectserialno({like :event, busid :this.busid});
    this.getserialno = this.getseriallist;
    console.log("get serial no ", this.getserialno);
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
