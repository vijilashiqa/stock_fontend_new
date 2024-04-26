import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../../_services/pager.service';
import { RoleservicesService } from '../../../_services/roleservices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { DeviceService } from '../../../_services/device.service';


@Component({
  selector: 'ngx-list-device',
  templateUrl: './list-device.component.html',
  styleUrls: ['./list-device.component.scss']
})
export class ListDeviceComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;listdevice;data;count;loading=false;
  constructor(
    private device: DeviceService,
    private pageservice :PagerService,
    public role: RoleservicesService,
    private modal: NgbModal,
  ) { }

 async ngOnInit() {
  await this.initiallist();
  }

  async initiallist() {
    this.loading=true;
    this.listdevice = await this.device.listdevice({index:(this.page - 1) * this.limit,limit:this.limit});
    console.log('invoice=====', this.listdevice)
    this.data = this.listdevice[0];
    this.count = this.listdevice[1].count;
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



  adddevice() {
    const modalRef = this.modal.open(AddDeviceComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Add Device';
    modalRef.result.then((data) => {
      this.initiallist();
    })
  };



  editdevice(item) {
    const modalRef = this.modal.open(AddDeviceComponent, { container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Edit Device';
    modalRef.componentInstance.item = item
    modalRef.result.then((data) => {
    this.initiallist();
  })
}


}
