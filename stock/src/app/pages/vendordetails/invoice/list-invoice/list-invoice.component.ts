import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { InvoiceService } from '../../../_services/invoice.service';
import { ViewInvoiceComponent } from '../view-invoice/view-invoice.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusinessService } from '../../../_services/business.service';
import { VendorService } from '../../../_services/vendor.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as JSXLSX from 'xlsx';
@Component({
  selector: 'ngx-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listinvoice;data;count;loading=false;search;busid;vendor;invoice
  constructor(
    private invoiceser: InvoiceService,
    private pageservice :PagerService,
    public role: RoleservicesService,
    private modal: NgbModal,
    public Business :BusinessService,
    private vendorser :VendorService
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
  await this.getvendorf();
  await this.getinvoicef();
}
  }

  async initiallist() {
    this.loading=true;
    this.listinvoice = await this.invoiceser.listinvoice({index:(this.page - 1) * this.limit,limit:this.limit,busid :this.busid , vid: this.vendor, id:this.invoice });
    console.log('invoice=====', this.listinvoice)
    this.data = this.listinvoice[0];
    this.count = this.listinvoice[1].count;
    this.loading=false;
    this.setPage();

  }
  
  getbusinessd;getbuss
  async getBusiness(event ='') {
    this.getbusinessd = await this.Business.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
    console.log("get business ", this.getbuss);
  }


  getvendor ;getvendorlist
  async getvendorf(event ='') {
    this.getvendorlist = await this.vendorser.getvendor({vlike :event , bid :this.busid});
    this.getvendor = this.getvendorlist;
    console.log("get vendor ", this.getvendor);
  }


  getinvoice;getinvoicelist
  async getinvoicef(event ='') {
    this.getinvoicelist = await this.invoiceser.getinvoice({ like :event, bid :this.busid});
    this.getinvoice = this.getinvoicelist[0];
    console.log("get invoice ", this.getinvoice);
  }

changbusiness(){

  this.vendor='';
  this.invoice='';
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


  get_invoice(invdata) {
    const activeModal = this.modal.open(ViewInvoiceComponent, { size: 'lg', container: 'nb-layout' , backdrop: false });
    activeModal.componentInstance.modalHeader = 'View Invoice';
    activeModal.componentInstance.invdata = invdata;
   
  }



  async Download() {
    console.log("download");
    
    this.listinvoice = await this.invoiceser.listinvoice({
      busid :this.busid ,
      vid: this.vendor,
      id:this.invoice 


    });
    this.data = this.listinvoice[0]
    if (this.data) {
      let tempdata = [], temp: any = this.data;
      for (var i = 0; i < temp.length; i++) {
        let parm = {};
        parm['Business Name'] = temp[i]['bname'];
        parm['Business Address'] = temp[i]['busaddr'];
        parm['Vendore Name '] = temp[i]['vcompany'] ;
        parm['Vendore Address'] = temp[i]['vaddr'];
        parm['Invoice No'] = temp[i]['invno'];
        tempdata[i] = parm;
      }
      const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(tempdata);
      const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
      JSXLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
      JSXLSX.writeFile(wb, 'Invoice_list' + EXCEL_EXTENSION);
    }
  }


  
}