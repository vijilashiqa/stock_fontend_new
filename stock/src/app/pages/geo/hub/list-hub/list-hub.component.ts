import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../../_services/pager.service';

import { HubService } from '../../../_services/hub.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSerialnoComponent } from '../add-serialno/add-serialno.component';
import { BusinessService } from '../../../_services/business.service';
import { DepartmentService } from '../../../_services/department.service';
@Component({
  selector: 'ngx-list-hub',
  templateUrl: './list-hub.component.html',
  styleUrls: ['./list-hub.component.scss']
})
export class ListHubComponent {

  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;getlisthub;data;count;search;busid;depart;hub
  loading=false;
  
  constructor(
    private modal: NgbModal,
    private hubser :HubService,
    public role :RoleservicesService,
    public pageservice: PagerService,
    public departmentrtser :DepartmentService,
    private  Business :BusinessService,
 
    ) { }
async  ngOnInit() {

await    this.initiallist();

    if(this.role.getroleid() > 888){
      await this.getBusiness()
      }
  else{
    this.busid = this.role.getbusiness();
    await this.getdepf()
    await this.gethubf()
  }
  }




  async initiallist() {
    this.loading=true;
    this.getlisthub = await this.hubser.listhub({index:(this.page - 1) * this.limit,limit:this.limit , bid: this.busid , depid : this.depart ,hubid : this.hub});
    console.log('list hub=====', this.getlisthub)
    this.data = this.getlisthub[0];
    console.log("data",this.data)
    this.count = this.getlisthub[1].count;
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
  
  changebusiness(){
    console.log('clear');
    
    this.depart ='';
    this.hub='';
  }

 

  getbusinessd;getbuss
  async getBusiness(event ='') {
    this.getbusinessd = await this.Business.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
    console.log("get business ", this.getbuss);
  }



  getdepartment;getdepartmentlist


  async getdepf(event ='') {
    this.getdepartmentlist = await this.departmentrtser.selectdepartment({like :event , busid: this.busid});
    this.getdepartment = this.getdepartmentlist;
    console.log("get dept ", this.getdepartment);
  }



  gethub;gethublist


  async gethubf(event ='') {
    this.gethublist = await this.hubser.gethub({like :event , bid: this.busid});
    this.gethub = this.gethublist;
    console.log("get hub ", this.gethub);
  }



  addserialno(item) {
    const modalRef = this.modal.open(AddSerialnoComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Add Serial No';
    modalRef.componentInstance.item = item
    modalRef.result.then((data) => {
      this.initiallist();
    })
  };

//   edithub(item) {
//     const modalRef = this.modal.open(AddHubComponent, { container: 'nb-layout', backdrop: false });
//     modalRef.componentInstance.title = 'Edit HUB';
//     modalRef.componentInstance.item = item
//     modalRef.result.then((data) => {
//     this.initiallist();
//   })
// }

  }