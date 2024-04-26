import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../../_services/pager.service';
import { OwnuseService } from '../../../_services/ownuse.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLocationComponent } from '../add-location/add-location.component';
import { RoleservicesService } from '../../../_services/roleservices.service';


@Component({
  selector: 'ngx-list-own',
  templateUrl: './list-own.component.html',
  styleUrls: ['./list-own.component.scss']
})
export class ListOwnComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;ownuselist;data;count;loading=false;disabled = false;i
  constructor(
    private pageservice :PagerService,
    private ownuse :OwnuseService,
    private route: Router,
    public role :RoleservicesService  ,
    private modal: NgbModal,

  ) { }

 async ngOnInit() {
  await this.initiallist();
  
  
  }

  async initiallist() {
    this.loading=true;
    this.ownuselist = await this.ownuse.listownuse({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('ownuselist=====', this.ownuselist)
    this.data = this.ownuselist[0];
    this.count = this.ownuselist[1].count;
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


  get_location(ownid ){

    const activeModal = this.modal.open(AddLocationComponent, { size: 'md', container: 'nb-layout' , backdrop: false });
    activeModal.componentInstance.modalHeader = 'Add Location';
    activeModal.componentInstance.item = ownid ;
   

    // const modalRef = this.modal.open(AddLocationComponent, { container: 'nb-layout', backdrop: false });
    // modalRef.componentInstance.title = 'Add District';
    // modalRef.result.then((data) => {
    //   this.initiallist();
    // })
  }

  setPage() {
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }
  
}