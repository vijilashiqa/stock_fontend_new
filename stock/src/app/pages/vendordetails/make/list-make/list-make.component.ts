
import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { InvoiceService } from '../../../_services/invoice.service';
import { ViewInvoiceComponent } from '../../invoice/view-invoice/view-invoice.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMakeComponent } from '../add-make/add-make.component';
import { MakeService } from '../../../_services/make.service';

@Component({
  selector: 'ngx-list-make',
  templateUrl: './list-make.component.html',
  styleUrls: ['./list-make.component.scss']
})
export class ListMakeComponent {

  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listmake;data;count;loading=false;
  constructor(
    private make: MakeService,
    private pageservice :PagerService,
    public role: RoleservicesService,
    private modal: NgbModal,
  ) { }

 async ngOnInit() {
  await this.initiallist();
  }

  async initiallist() {
    this.loading=true;
    this.listmake = await this.make.listmake({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('make=====', this.listmake)
    this.data = this.listmake[0];
    this.count = this.listmake[1].count;
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
  //   const activeModal = this.modal.open(AddMakeComponent, { size: 'lg', container: 'nb-layout' , backdrop: false });
  //   activeModal.componentInstance.modalHeader = 'Add Make';
  //   // activeModal.componentInstance.invdata = invdata;
   
  // }



  addmake() {
    const modalRef = this.modal.open(AddMakeComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Add Make';
    modalRef.result.then((data) => {
      this.initiallist();
    })
  };



  editmake(item) {
    const modalRef = this.modal.open(AddMakeComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Edit Make';
    modalRef.componentInstance.item = item
    modalRef.result.then((data) => {
    this.initiallist();
  })
}


}
