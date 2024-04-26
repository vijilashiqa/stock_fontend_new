import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStateComponent } from '../add-state/add-state.component';
import { StateService } from '../../../_services/state.service';
import { PagerService } from '../../../_services/pager.service';

@Component({
  selector: 'ngx-list-state',
  templateUrl: './list-state.component.html',
  styleUrls: ['./list-state.component.scss']
})
export class ListStateComponent implements OnInit {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25; getlistcountry; data; count;

  loading=false;

 constructor(
    public pageservice: PagerService, 
    private State: StateService,
   private modal: NgbModal,
 ) {
 }

 ngOnInit() {
   this.initiallist();
 }

 async initiallist() {
   this.loading=true;
   this.getlistcountry = await this.State.liststate({ index: (this.page - 1) * this.limit, limit: this.limit });
   console.log('State=====', this.getlistcountry)
   this.data = this.getlistcountry[0];
   console.log("state Name",this.data);
   
   this.count = this.getlistcountry[1].count;
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


 Addstate() {
   const modalRef = this.modal.open(AddStateComponent, { container: 'nb-layout', backdrop: false });
   modalRef.componentInstance.title = 'Add State';
   modalRef.result.then((data) => {
     this.initiallist();
   })
  }


   editstate(item) {
    const modalRef = this.modal.open(AddStateComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Edit State';
    modalRef.componentInstance.item = item
    modalRef.result.then((data) => {
      this.initiallist();
    })
  }

 };


 

 

 