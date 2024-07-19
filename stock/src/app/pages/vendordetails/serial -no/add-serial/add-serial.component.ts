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
import { RoleservicesService } from "../../../_services/roleservices.service";
const EXCEL_EXTENSION = ".xlsx";
@Component({
  selector: 'ngx-add-serial',
  templateUrl: './add-serial.component.html',
  styleUrls: ['./add-serial.component.scss']
})
export class AddSerialComponent {
  addserial;
  cas: any = [];
  editdata = {};
  getbusinessd; getbuss
  editflag = false; getmodelqty
  failure: any = []; getvalue; indiv1
  submit: boolean; vv1
  channellist: any = [];
  disabled = false; getinvoiced;resp
  channelsrv;
  result; datacount; getinvoice1 ;getinvoice2
  alert: any;i
  editable: boolean = false;
  id;
  router: any;
  listhead; vv
  listhdcas; count
  listchnnel; getiteml1
  bulkmeta: any = [];
  bulk = []; getiteml
  arrayBuffer: any;
  file: any[];
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private modal: NgbModal,
    private bussiness: BusinessService,
    private invoiceser: InvoiceService,
    private modelserv: ModelService,
    private toast: NbToastrService,
    private aRoute: ActivatedRoute,
    private serialnos: SerialnoService,
    public role:RoleservicesService
  ) { }

  async ngOnInit() {
    this.id = this.aRoute.snapshot.queryParams["id"];
    await this.createForm();

    if(this.role.getroleid() > 888){
      await this.getBusiness()
      }
  else{
    this.addserial.get('bid').setValue(this.role.getbusiness());
    await this.getinvoice();

  }
    await this.getitem();
    // await this.getqty()
    if (this.id) {
      await this.edit();
    }
  }
  async edit() {
    console.log("edit ", this.editdata)
    this.editdata = await this.serialnos.editserial({ id: this.id });

    this.createForm();
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
  // clearValue(...value) {
  //   for (let i of value) {
  //     console.log("clear value");
  //     this.addserial.get(i).clearValidators();
  //     this.addserial.get(i).updateValueAndValidity();
  //   }
  // }

  
  async getBusiness( event ='') {
    this.getbusinessd = await this.bussiness.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
  }

 

  async getinvoice(event='') {
    this.getinvoiced = await this.invoiceser.getinvoice({ like: event ,busid:this.addserial.value['bid'] })
this.getinvoice1=this.getinvoiced[0]
    console.log("invoice ", this.getinvoice1);
  }
  async getitem() {
    this.vv = this.addserial.value['invno']
    this.getiteml = await this.invoiceser.getinvoice_item_edit({ id: this.addserial.value['invno'] })
    this.getiteml1 = this.getiteml[0];
    console.log("invoice ", this.getiteml1);
  }


  async getval(event) {
    this.count = event.itemqty;
    this.vv1 = event.iiid
    let itemmap = await this.getiteml1.filter((x) => x.iiid == this.vv1).map(x => x.iiid).toString()
    console.log(" 1 item quty", itemmap,);
    console.log("item val", event.itemqty, "iddd", event.iiid);
    this.getmodelqty = await this.modelserv.selectqty({ id: itemmap })
    this.datacount = this.getmodelqty[0].cnt
    console.log(" 2 item quty", this.datacount);
    if (this.datacount == 0) {
      this.toast.warning("", "No serial Number to add");
    }
  }


  async getqty() {

  }


  changeinvoicef() {
    this.addserial.controls.itemname.setValue("");
  }


changebussiness(){
  this.addserial.controls.invno.setValue("");
}


  Download() {
    const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(this.failure);
    const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
    JSXLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");
    JSXLSX.writeFile(wb, "stb_failed_report" + EXCEL_EXTENSION);
  }


  async addserialno() {
    this.submit = true;
    const invalid = [];
    const control = this.ctrl
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
      }
    }
    if (this.addserial.invalid) {
      return;
    }
    if (this.val["modetype"] == 1) {
      let result = await this.serialnos.addserial(this.addserial.value);
      if (result && result[0].err_code == 0) {
        this.toast.success("", result[0]["msg"]);
        this.route.navigate(["/pages/vendor/list-serial"]);
      } else {
        this.toast.warning("", result[0]["msg"]);
      }
    }
    if (this.bulk.length && this.val["modetype"] == 0) {
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
        this.addserial.value["serial_num"] = this.bulk
      }
       this.resp = await this.serialnos.addserial(this.addserial.value);
      console.log("bulkResult????????????????? ", this.resp);
      console.log("response length", this.resp.length)
      if (this.resp && this.resp[0].err_code == 0) {
        this.toast.success('', this.resp[0]["msg"]);
        this.route.navigate(["/pages/vendor/list-serial"]);
      } else {
        let item = this.resp;
        this.Error(item)
      }


      for( this.i=0;this.i < this.resp.length; this.i++)

        {
console.log("length of the  upload", this.resp[this.i])
console.log(" error code ", this.resp[this.i].err_code !==0)
        }

        if(this.resp[this.i] !== 0){
          let item = this.resp;
          this.Error(item)
  
        }
    }

  
  }




  changeListener(file) {
    this.file = file;
    this.filereader(this.file, (result) => {
      this.bulk = result;
      console.log("result............", this.bulk);
    });
  }

  clearValidation(even) {
    this.getvalue = even.target.value
    console.log("get value ", this.getvalue);


  }

  addValidation(idx: number) {

    console.log("index", idx);

    const controlArray = <FormArray>this.addserial.get('serial_num');
    console.log("array", controlArray.controls[idx].value);
    if (this.getvalue == 0) {
      console.log("validation SINGLE")
      controlArray.controls[idx].get('serialno').clearValidators();
      controlArray.controls[idx].get('serialno').updateValueAndValidity();
    }

    if (this.getvalue == 1) {
      controlArray.controls[idx].get('serialno').setValidators(Validators.required);
      controlArray.controls[idx].get('serialno').updateValueAndValidity();
    }
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


  get serial_num(): FormArray {
    return this.addserial.get('serial_num') as FormArray;
  }

  addserialf() {
    this.serial_num.push(this.createserial());
  }

  deleteserial(index: number) {
    this.serial_num.removeAt(index);
  }
  createserial(): FormGroup {
    return this.fb.group({ serialno: ['', Validators.required] });
  }

  get ctrl() {
    return this.addserial.controls
  }

  Error(item) {
    const modalRef = this.modal.open(ErrormessageComponent, { size: 'lg', container: 'nb-layout', backdrop: false });
    modalRef.componentInstance.title = 'Error List';
    modalRef.componentInstance.item = item;
    modalRef.result.then((data) => {
      ;

    })

  }


  createForm() {
    this.addserial = new FormGroup({
      bid: new FormControl(this.editdata["bid"] || "", Validators.required),
      invno: new FormControl(this.editdata["invno"] || "", Validators.required),
      itemname: new FormControl(this.editdata["itemname"] || "", Validators.required),
      modetype: new FormControl(null, Validators.required),
      serial_num: new FormArray([this.createserial()]),
    });
  }

  get val() {
    return this.addserial.value;
  }
}
