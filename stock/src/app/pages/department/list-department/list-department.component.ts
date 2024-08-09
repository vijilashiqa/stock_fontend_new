
import { Component, OnInit } from '@angular/core';
import { DistrictService } from '../../_services/district.service';
import { StateService } from '../../_services/state.service';
import { PagerService } from '../../_services/pager.service';

import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RoleservicesService } from '../../_services/roleservices.service';
import { AddDistrictComponent } from '../../geo/district/add-district/add-district.component';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { DepartmentService } from '../../_services/department.service';
import { BusinessService } from '../../_services/business.service';

@Component({
  selector: 'ngx-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss']
})
export class ListDepartmentComponent {

  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;getdepartment;data;count;search;busid='';department;
  loading=false;
  
  constructor(
    private modal: NgbModal,
    public role :RoleservicesService,
    private departmentser :DepartmentService,
    public pageservice: PagerService,
    private Business : BusinessService,

  ) { }
 async ngOnInit() {

   await this.initiallist();
// await this.getBusiness();
// await this.getdepartmentf()
if(this.role.getroleid() > 888){
  await this.getBusiness()
  }
else{
this.busid = this.role.getbusiness();
console.log("after the ",this.busid);
await this.getdepartmentf();
// await this.getmail()
}
    
  }



  async initiallist() {
    this.loading=true;
    this.getdepartment = await this.departmentser.listdepartment({index:(this.page - 1) * this.limit,limit:this.limit ,bid : this.busid , depname : this.department});
    console.log('department=====', this.getdepartment)
    this.data = this.getdepartment[0];
    console.log("data",this.data)
    this.count = this.getdepartment[1].count;
    this.loading=false;
    this.setPage();

  }



  getbusinessd;getbuss
  async getBusiness(event ='') {
    this.getbusinessd = await this.Business.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
    console.log("get business ", this.getbuss);
  }


  getdep;getped
  async getdepartmentf(event ='') {
    this.getped = await this.departmentser.selectdepartment({like :event , busid :this.busid});
    this.getdep = this.getped;
    console.log("get depart ", this.getped);
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
  
  changedbusiness(){

    this.department =''
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
 