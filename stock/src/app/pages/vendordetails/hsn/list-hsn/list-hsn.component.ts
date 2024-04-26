import { Component } from "@angular/core";
import { PagerService } from "../../../_services/pager.service";
import { AddHsnComponent } from "../../hsn/add-hsn/add-hsn.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HsnService } from "../../../_services/hsn.service";
import { RoleservicesService } from "../../../_services/roleservices.service";
@Component({
  selector: "ngx-list-hsn",
  templateUrl: "./list-hsn.component.html",
  styleUrls: ["./list-hsn.component.scss"],
})
export class ListHsnComponent {
  pager: any = {};
  page: number = 1;
  pagedItems: any = [];
  limit = 25;
  listhsn;
  data;
  count;
  loading = false;

  constructor(
    private modal: NgbModal,
    private hsn: HsnService,
    public role :RoleservicesService,
    public pageservice: PagerService
  ) {}
  ngOnInit() {
    this.initiallist();
  }

  async initiallist() {
    this.loading = true;
    this.listhsn = await this.hsn.listhsn({
      index: (this.page - 1) * this.limit,
      limit: this.limit,
    });
    console.log("list model", this.listhsn);
    this.data = this.listhsn[0];
    this.count = this.listhsn[1].count;
    this.loading = false;
    this.setPage();
  }
  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result["value"];
    if (result["result"]) {
      this.initiallist();
    }
  }

  setPage() {
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }

  Addmodel() {
    const modalRef = this.modal.open(AddHsnComponent, {
      container: "nb-layout",
      backdrop: false,
    });
    modalRef.componentInstance.title = "Add HSN";
    modalRef.result.then((data) => {
      this.initiallist();
    });
  }

  Editmodel(item) {
    const modalRef = this.modal.open(AddHsnComponent, {
      container: "nb-layout",
      backdrop: false,
    });
    modalRef.componentInstance.title = "Edit HSN";
    modalRef.componentInstance.item = item;
    modalRef.result.then((data) => {
      this.initiallist();
    });
  }
}
