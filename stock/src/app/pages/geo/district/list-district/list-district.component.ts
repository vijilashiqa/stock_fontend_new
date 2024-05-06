
import { AddDistrictComponent } from '../add-district/add-district.component';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';


import { DistrictService } from '../../../_services/district.service';
import { StateService } from '../../../_services/state.service';
import { PagerService } from '../../../_services/pager.service';

import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RoleservicesService } from '../../../_services/roleservices.service';
@Component({
  selector: 'ngx-list-district',
  templateUrl: './list-district.component.html',
  styleUrls: ['./list-district.component.scss']
})
export class ListDistrictComponent {

  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;getlistdistrict;data;count;
  loading=false;
  
  constructor(
    private modal: NgbModal,
    public role :RoleservicesService,
    private distric :DistrictService,
    public pageservice: PagerService,
    private state : StateService
  ) { }
  ngOnInit() {

    this.initiallist();

    console.log("menu role list ", this.role.getroleval() == 1004);
    

    console.log("menu", this.role.getroleval());
    
  }



  async initiallist() {
    this.loading=true;
    this.getlistdistrict = await this.distric.listdistrict({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('district=====', this.getlistdistrict)
    this.data = this.getlistdistrict[0];
    console.log("data",this.data)
    this.count = this.getlistdistrict[1].count;
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
  
  

  Adddistrict() {
    const modalRef = this.modal.open(AddDistrictComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Add District';
    modalRef.result.then((data) => {
      this.initiallist();
    })
  };

  editdistrict(item) {
    const modalRef = this.modal.open(AddDistrictComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Edit District';
    modalRef.componentInstance.item = item
    modalRef.result.then((data) => {
    this.initiallist();
  })
}

  }
 