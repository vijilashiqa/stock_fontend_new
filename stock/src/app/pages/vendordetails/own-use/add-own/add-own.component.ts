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
const EXCEL_EXTENSION = ".xlsx";

@Component({
  selector: 'ngx-add-own',
  templateUrl: './add-own.component.html',
  styleUrls: ['./add-own.component.scss']
})
export class AddOwnComponent {
  addownuseForm;
  cas: any = []; cleardropp
  editdata = {};
  getbusinessd; getbuss
  editflag = false; getmodelqty
  failure: any = []; getvalue; indiv1
  submit: boolean; vv1
  channellist: any = [];
  disabled = false; getinvoiced
  channelsrv; iiid;calarray
  result; datacount;array1=[]
  alert: any; getserialnof
  editable: boolean = false;
  id; getoperatorlist
  router: any; getmodelid
  listhead; vv; getserialnof1
  listhdcas; count;editserialnolist
  listchnnel; getiteml1; model_sid
  bulkmeta: any = [];
  bulk = []; getiteml
  arrayBuffer: any;addorremoveser
  Remove;  file: any[];
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private modal: NgbModal,
    private bussiness: BusinessService,
    private invoiceser: InvoiceService,
    private modelserv: ModelService,
    private ownuseservices: OwnuseService,
    private toast: NbToastrService,
    private aRoute: ActivatedRoute,
    private serialnos: SerialnoService,
  ) { }

  async ngOnInit() {
 
    
    this.id = this.aRoute.snapshot.queryParams["id"];
     this.model_sid = this.aRoute.snapshot.queryParams["model_sid"];
    await this.createForm();
    await this.getBusiness();
    await this.getitem();
    // if (this.id) {
    //   await this.edit();
    //   await this.editserialno()
    //   // await this.getserialno()
    // }
  }
 
  


 
  
  async getBusiness() {
    this.getbusinessd = await this.bussiness.getbusiness({});
    this.getbuss = this.getbusinessd[0];
  }
  async getinvoice() {
    this.getinvoiced = await this.invoiceser.getinvoice({})
    console.log("invoice ", this.getinvoiced);
  }
  async getitem() {
    this.getiteml = await this.invoiceser.getinvoice_item_edit({ id: this.addownuseForm.value['invno'] })
    this.getiteml1 = this.getiteml[0];
    console.log("get item ", this.getiteml1);
  }





  changedrop(event) {
    this.getmodelid = event.modelid
    this.iiid = event.iiid
    this.getserialno()
  }





  changeinvoicef() {
    this.addownuseForm.controls.itemname.setValue("");
  }
  async addchannelsrv() {
    this.submit = true;
    const invalid = [];
    const control =  this.addownuseForm.controls;
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
        this.toast.warning(name, "please fill mantrity data");
      }
    }
    if (this.addownuseForm.invalid) {
      return;
    }
    if (this.val["modetype"] == 0){
      let result = await this.ownuseservices.addownuse(this.addownuseForm.value);
      if (result && result[0].err_code == 0) {
        this.toast.success("", result[0]["msg"]);
        this.route.navigate(["/pages/vendor/list-ownuse"]);
      } else {
        this.toast.warning("", result[0]["msg"]);
      }

    }
    if (this.bulk.length && this.val["modetype"] == 1) {
      let result = this.metavalue();
      for (let i = 0; i < this.bulk.length; i++) {
        for (let meta of result) {
          if (!this.bulk[i].hasOwnProperty(meta.label) && meta.required) {
            this.toast.warning('', meta.msg);
            return;
          } else {
            this.bulk[i][meta.assign_to] = this.bulk[i][meta.label];
          }
        }
        this.addownuseForm.value["serial_num"] = this.bulk
      }
      let resp = await  this.ownuseservices.addownuse(this.addownuseForm.value);
      console.log("bulkResult????????????????? ", resp);
      if (resp && resp[0].err_code == 0) {
        this.toast.success('', resp[0]["msg"]);
        this.route.navigate(["/pages/vendor/list-ownuse"]);
      } else {
        let item = resp
        this.Error(item)
      }
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







  


  filereader(file, callback) {
    if (file) {
      let fileReader = new FileReader()
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = JSXLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        callback(JSXLSX.utils.sheet_to_json(worksheet, { raw: true }));
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      callback([]);
    }
  }



  async getserialno() {
    this.getserialnof = await this.ownuseservices.selectmodel_serial({ modelid: this.addownuseForm.value["itemname"] })
    this.getoperatorlist = this.getserialnof
  }


  

changeserialno() {
  this.addownuseForm.controls.model_sid.setValue("");
}


clearValidation() {
  if(this.addownuseForm.value["modetype"] == 1){
    this.addownuseForm.get('model_sid').clearValidators();
    this.addownuseForm.get('model_sid').updateValueAndValidity();
  }else{
    this.addownuseForm.get("model_sid").setValidators([Validators.required]);
    this.addownuseForm.get("model_sid").updateValueAndValidity();
  }

}


  
  metavalue() {
    this.bulkmeta = [
      {
        msg: "Please fill Serial No",
        label: "SerialNo*",
        assign_to: "serialno",
        required: true,
      },

    ];
    return this.bulkmeta;
  }

  Download() {
    const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(this.failure);
    console.log('failure thwr ######3', this.failure)
    const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
    JSXLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");
    /* save to file */
    JSXLSX.writeFile(wb, "stb_failed_report" + EXCEL_EXTENSION);
  }

  
  changeListener(file) {
    this.file = file;
    this.filereader(this.file, (result) => {
      this.bulk = result;
      console.log("result............", this.bulk);
    });
  }

  createForm() {
    this.addownuseForm = new FormGroup({
      bid: new FormControl(this.editdata["bid"] || "", Validators.required),
      itemname:new FormControl (this.editdata["iiid"] || "", Validators.required),
       model_sid:new FormControl (this.editdata["model_sid"] || "" ,Validators.required),
       modetype :new FormControl (this.editdata["modetype"] || "0" ,Validators.required),
    });
  }

  get val() {
    return this.addownuseForm.value;
  }
}
