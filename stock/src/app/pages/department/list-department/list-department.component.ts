
import { Component, OnInit } from '@angular/core';
import { DistrictService } from '../../_services/district.service';
import { StateService } from '../../_services/state.service';
import { PagerService } from '../../_services/pager.service';

import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RoleservicesService } from '../../_services/roleservices.service';
import { AddDistrictComponent } from '../../geo/district/add-district/add-district.component';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { DepartmentService } from '../../_services/department.service';

@Component({
  selector: 'ngx-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss']
})
export class ListDepartmentComponent {

  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;getdepartment;data;count;
  loading=false;
  
  constructor(
    private modal: NgbModal,
    public role :RoleservicesService,
    private departmentser :DepartmentService,
    public pageservice: PagerService,
    private state : StateService
  ) { }
  ngOnInit() {

    this.initiallist();

    
    
  }



  async initiallist() {
    this.loading=true;
    this.getdepartment = await this.departmentser.listdepartment({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('department=====', this.getdepartment)
    this.data = this.getdepartment[0];
    console.log("data",this.data)
    this.count = this.getdepartment[1].count;
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
  
  

  adddepartment() {
    const modalRef = this.modal.open(AddDepartmentComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Add Department';
    modalRef.result.then((data) => {
      this.initiallist();
    })
  };

  editdepartent(item) {
    const modalRef = this.modal.open(AddDepartmentComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Edit Department';
    modalRef.componentInstance.item = item
    modalRef.result.then((data) => {
    this.initiallist();
  })
}

  }
 