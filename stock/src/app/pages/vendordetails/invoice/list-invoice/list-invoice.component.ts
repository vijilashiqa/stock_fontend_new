import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { InvoiceService } from '../../../_services/invoice.service';
import { ViewInvoiceComponent } from '../view-invoice/view-invoice.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listinvoice;data;count;loading=false;
  constructor(
    private invoiceser: InvoiceService,
    private pageservice :PagerService,
    public role: RoleservicesService,
    private modal: NgbModal,
  ) { }

 async ngOnInit() {
  await this.initiallist();
  }

  async initiallist() {
    this.loading=true;
    this.listinvoice = await this.invoiceser.listinvoice({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('invoice=====', this.listinvoice)
    this.data = this.listinvoice[0];
    this.count = this.listinvoice[1].count;
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


  get_invoice(invdata) {
    const activeModal = this.modal.open(ViewInvoiceComponent, { size: 'lg', container: 'nb-layout' , backdrop: false });
    activeModal.componentInstance.modalHeader = 'View Invoice';
    activeModal.componentInstance.invdata = invdata;
   
  }
  
}