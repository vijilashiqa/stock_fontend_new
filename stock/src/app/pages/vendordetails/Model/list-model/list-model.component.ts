import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { InvoiceService } from '../../../_services/invoice.service';
import { ViewInvoiceComponent } from '../../invoice/view-invoice/view-invoice.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddModelComponent } from '../add-model/add-model.component';
import { ModelService } from '../../../_services/model.service';

@Component({
  selector: 'ngx-list-model',
  templateUrl: './list-model.component.html',
  styleUrls: ['./list-model.component.scss']
})
export class ListModelComponent {

  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listinvoice;data;count;loading=false;
  constructor(
    private modelser: ModelService,
    private pageservice :PagerService,
    public role: RoleservicesService,
    private modal: NgbModal,
  ) { }

 async ngOnInit() {
  await this.initiallist();
  }

  async initiallist() {
    this.loading=true;
    this.listinvoice = await this.modelser.listmodel({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('invoice=====', this.listinvoice)
    this.data = this.listinvoice[0];
    this.count = this.listinvoice[1].count;
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

  // addmake() {
  //   const activeModal = this.modal.open(AddModelComponent, { size: 'lg', container: 'nb-layout' , backdrop: false });
  //   activeModal.componentInstance.modalHeader = 'Add Make';
  //   // activeModal.componentInstance.invdata = invdata;
   
  // }



  addmake() {
    const modalRef = this.modal.open(AddModelComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Add Model';
    modalRef.result.then((data) => {
      this.initiallist();
    })
  };



  editmodel(item) {
    const modalRef = this.modal.open(AddModelComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Edit Model';
    modalRef.componentInstance.item = item
    modalRef.result.then((data) => {
    this.initiallist();
  })
}


}