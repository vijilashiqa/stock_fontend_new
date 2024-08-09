import { Component, OnInit } from "@angular/core";
import { PagerService } from "../../../_services/pager.service";
import { OwnuseService } from "../../../_services/ownuse.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddLocationComponent } from "../add-location/add-location.component";
import { RoleservicesService } from "../../../_services/roleservices.service";
import { BusinessService } from "../../../_services/business.service";
import { DepartmentService } from "../../../_services/department.service";
import { ModelService } from "../../../_services/model.service";
import { SerialnoService } from "../../../_services/serialno.service";

@Component({
  selector: "ngx-list-own",
  templateUrl: "./list-own.component.html",
  styleUrls: ["./list-own.component.scss"],
})
export class ListOwnComponent {
  pager: any = {};
  page: number = 1;
  pagedItems: any = [];
  depart;serialno
  limit = 25;
  ownuselist;
  data;
  count;
  loading = false;
  disabled = false;
  i;
  search;
  busid;
  constructor(
    private pageservice: PagerService,
    private ownuse: OwnuseService,
    public role: RoleservicesService,
    private modal: NgbModal,
    public modelser :SerialnoService,
    public departmentrtser: DepartmentService,
    public Business: BusinessService
  ) {}

  async ngOnInit() {
    await this.initiallist();
    if (this.role.getroleid() > 888) {
      await this.getBusiness();
    } else {
      this.busid = this.role.getbusiness();
      console.log("after the ", this.busid);
      await this.getdepf();
      await this.getserialnof()
    }
  }

  async initiallist() {
    this.loading = true;
    this.ownuselist = await this.ownuse.listownuse({
      index: (this.page - 1) * this.limit,
      limit: this.limit,
      busid: this.busid,
      depid :this.depart,
      model_sid :this.serialno
    });
    console.log("ownuselist=====", this.ownuselist);
    this.data = this.ownuselist[0];
    this.count = this.ownuselist[1].count;
    this.loading = false;
    this.setPage();
  }


  
  getbusinessd;
  getbuss;
  async getBusiness(event = "") {
    this.getbusinessd = await this.Business.getbusiness({ like: event });
    this.getbuss = this.getbusinessd[0];
    console.log("get business ", this.getbuss);
  }


  getdepartment;
  getdepartmentlist;

  async getdepf(event = "") {
    this.getdepartmentlist = await this.departmentrtser.selectdepartment({like: event, busid: this.busid });
    this.getdepartment = this.getdepartmentlist;
    console.log("get dept ", this.getdepartment);
  }


  getserialno;getseriallist
  async getserialnof(event ='') {
    this.getseriallist = await this.modelser.selectserialno({like :event, busid :this.busid});
    this.getserialno = this.getseriallist;
    console.log("get serial no ", this.getserialno);
  }


  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result["value"];
    if (result["result"]) {
      this.initiallist();
    }
  }


  changebusiness(){
    console.log("clear");
    
    this.depart = '';
    this.serialno= '' ;

  }





  get_location(ownid) {
    const activeModal = this.modal.open(AddLocationComponent, {
      size: "md",
      container: "nb-layout",
      backdrop: false,
    });
    activeModal.componentInstance.modalHeader = "Add Location";
    activeModal.componentInstance.item = ownid;
  }

  setPage() {
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }
}
