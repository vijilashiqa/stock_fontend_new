import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import * as JSXLSX from "xlsx";
import { ActivatedRoute, Router } from "@angular/router";
import { BusinessService } from "../../../_services/business.service";
import { InvoiceService } from "../../../_services/invoice.service";
import { SerialnoService } from "../../../_services/serialno.service";
import { NbToastrService } from "@nebular/theme";
import { ErrormessageComponent } from "../../../errormessage/errormessage.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModelService } from "../../../_services/model.service";
import { OwnuseService } from "../../../_services/ownuse.service";
import { DepartmentService } from "../../../_services/department.service";
import { RoleservicesService } from "../../../_services/roleservices.service";
import { HubService } from "../../../_services/hub.service";
const EXCEL_EXTENSION = ".xlsx";

@Component({
  selector: 'ngx-edit-own',
  templateUrl: './edit-own.component.html',
  styleUrls: ['./edit-own.component.scss']
})
export class EditOwnComponent {
  editownuse;
  cas: any = []; cleardropp
  editown = {};
  getbusinessd; getbuss
  editflag = false; getmodelqty
  failure: any = []; getvalue; indiv1
  submit: boolean; vv1
  channellist: any = []; editdataown
  disabled = false; getinvoiced
  channelsrv; iiid; calarray; editserialnolist
  result; datacount; array1 = []
  alert: any; getserialnof
  editable: boolean = false;
  id; getoperatorlist
  router: any; getmodelid
  listhead; vv; getserialnof1
  listhdcas; count; getdepartment
  listchnnel; getiteml1; model_sid
  bulkmeta: any = [];
  bulk = []; getiteml
  arrayBuffer: any; addorremoveser
  Remove; file: any[]; modelselect; model
  constructor(
    private route: Router,
    private modal: NgbModal,
    private bussiness: BusinessService,
    private invoiceser: InvoiceService,
    private ownuseservices: OwnuseService,
    private toast: NbToastrService,
    public role: RoleservicesService,
    private aRoute: ActivatedRoute,
    private hubservices: HubService,
    private departmentser: DepartmentService,
  ) { }

  async ngOnInit() {


    this.id = this.aRoute.snapshot.queryParams["id"];
    this.model_sid = this.aRoute.snapshot.queryParams["model_sid"];
    await this.createForm();
    await this.getownusedata();
    if (this.role.getroleid() > 888) {
      await this.getBusiness()
    }
    else {
      this.editownuse.get('bid').setValue(this.role.getbusiness());
      await this.getdepartmentf();
    }
    // await this.getdepartmentf();
    await this.getitem();
    await this.editserialno();
    await this.selectmodel();
  }
  async getownusedata() {
    this.editown = await this.ownuseservices.getownuse({ id: this.id, model_sid: this.model_sid });
    console.log("edit ", this.editown)
    await this.selectmodel();
    await this.createForm();
  }

  async getitem(event = '') {
    this.getiteml = await this.invoiceser.getinvoice_item_edit({ id: this.editownuse.value['invno'], like: event, busid: this.editownuse.value['bid'] })
    this.getiteml1 = this.getiteml[0];
    console.log("get item ", this.getiteml1);
  }
  async getBusiness(event = '') {
    this.getbusinessd = await this.bussiness.getbusiness({ like: event });
    this.getbuss = this.getbusinessd[0];
  }
  async getinvoice() {
    this.getinvoiced = await this.invoiceser.getinvoice({})
    console.log("invoice ", this.getinvoiced);
  }

cleardep(){
  this.editownuse.controls.itemname.setValue("");

}


  changeserialno() {
    this.editownuse.controls.model_sid.setValue("");
  }
  async editownf() {
    this.submit = true;
    const invalid = [];
    const control = this.editownuse.controls;
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
        this.toast.warning(name, "please fill mantrity data");
      }
    }
    if (this.editownuse.invalid) {
      return;
    }
    this.editownuse.value["id"] = this.id;
    let result = await this.ownuseservices.editownuses(this.editownuse.value);
    if (result && result[0].err_code == 0) {
      this.toast.success("", result[0]["msg"]);
      this.route.navigate(["/pages/vendor/list-ownuse"]);
    } else {
      this.toast.warning("", result[0]["msg"]);
    }
  }


  Error(item) {
    const modalRef = this.modal.open(ErrormessageComponent, { size: 'lg', container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Error List';
    modalRef.componentInstance.item = item;
    modalRef.result.then((data) => {
      ;

    })

  }

  async selectmodel() {
    this.model = this.editownuse.value["itemname"];  // select item
    this.modelselect = await this.getiteml1?.filter(x => x.iiid == this.model).map(x => x.modelid).join()
    console.log("select model", this.modelselect);
  }

  async editserialno() {
    await this.selectmodel();
    console.log('@@@@@@@@@@@@@@@@@@@@@@@', this.modelselect);
    this.editserialnolist = await this.ownuseservices.selectmodel_serialedit({ model_sid: this.editown["model_sid"], modelid: this.modelselect })
    console.log(" editserialnolist@@@@@@@@@@@@", this.editserialnolist);

  }

  async getdepartmentf(event = '') {
    this.getdepartment = await this.departmentser.selectdepartment({ like: event, busid: this.editownuse.value["bid"] })
    console.log("get deprtment", this.getdepartment);

  }


  clearall() {
    console.log("clear");
    this.editownuse.controls.depid.setValue("");
    this.editownuse.controls.itemname.setValue("");
    this.editownuse.controls.model_sid.setValue("");
  }

  createForm() {
    this.editownuse = new FormGroup({
      bid: new FormControl(this.editown["bid"]),
      depid: new FormControl(this.editown["depid"] || "", Validators.required),
      itemname: new FormControl(this.editown["iiid"] || "", Validators.required),
      model_sid: new FormControl(this.editown["model_sid"] || "", Validators.required),
      sstatus: new FormControl(this.editown["sstatus"] || "", Validators.required)
    });
  }

  get val() {
    return this.editownuse.value;
  }
}
