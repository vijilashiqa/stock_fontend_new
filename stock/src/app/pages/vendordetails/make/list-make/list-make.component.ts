
import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { InvoiceService } from '../../../_services/invoice.service';
import { ViewInvoiceComponent } from '../../invoice/view-invoice/view-invoice.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMakeComponent } from '../add-make/add-make.component';
import { MakeService } from '../../../_services/make.service';
import { BusinessService } from '../../../_services/business.service';

@Component({
  selector: 'ngx-list-make',
  templateUrl: './list-make.component.html',
  styleUrls: ['./list-make.component.scss']
})
export class ListMakeComponent {

  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listmake;data;count;loading=false;search;busid;makes
  constructor(
    private make: MakeService,
    private pageservice :PagerService,
    public role: RoleservicesService,
    private modal: NgbModal,
    private Business : BusinessService,
  ) { }

 async ngOnInit() {
  await this.initiallist();
  if(this.role.getroleid() > 888){
    await this.getBusiness()
    }
else{
  this.busid = this.role.getbusiness();
   await this.getmakef();
}
  }

  async initiallist() {
    this.loading=true;
    this.listmake = await this.make.listmake({index:(this.page - 1) * this.limit,limit:this.limit , busid : this.busid , make :this.makes});
    console.log('make=====', this.listmake)
    this.data = this.listmake[0];
    this.count = this.listmake[1].count;
    this.loading=false;
    this.setPage();

  }
  Addvendor(){}
  getbusinessd;getbuss
  async getBusiness(event ='') {
    this.getbusinessd = await this.Business.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
    console.log("get business ", this.getbuss);
  }

changebusiness(){
  console.log("hete");
  
  this.makes =''
}


  getmake;getmakelist
  async getmakef(event ='') {
    this.getmakelist = await this.make.selectmake({like :event ,bid :this.busid});
    this.getmake = this.getmakelist;
    console.log("get make ", this.getmake);
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
