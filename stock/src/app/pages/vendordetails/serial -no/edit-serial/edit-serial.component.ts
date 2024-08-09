import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
// import {
//   HeadendService,
//   ChannelService,
//   RoleservicesService,
// } from "../../_services/index";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JSXLSX from "xlsx";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { BusinessService } from "../../../_services/business.service";
import { InvoiceService } from "../../../_services/invoice.service";
import { SerialnoService } from "../../../_services/serialno.service";
import { NbToastrService } from "@nebular/theme";
import { RoleservicesService } from "../../../_services/roleservices.service";

// import { ErrormsgComponent } from "../errormsg/errormsg.component";
// import { Item } from "@syncfusion/ej2-angular-navigations";
const EXCEL_TYPE ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Component({
  selector: 'ngx-edit-serial',
  templateUrl: './edit-serial.component.html',
  styleUrls: ['./edit-serial.component.scss']
})
export class EditSerialComponent {
  editserial;
  cas: any = [];
  editdata ;
  getbusinessd; getbuss
  editflag = false;
  failure: any = [];
  submit: boolean;
  channellist: any = [];
  disabled = false; getinvoiced
  channelsrv;
  result;
  alert: any;
  editable: boolean = false;
  id;
  router: any;
  listhead;
  listhdcas; count; itemmap1
  listchnnel; getiteml1;itemmap
  bulkmeta: any = [];
  bulk = []; getiteml
  arrayBuffer: any;getserial
  file: any[];assignadd;getinvoice1
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private bussiness: BusinessService,
    private invoiceser: InvoiceService,
    private toast: NbToastrService,
    private aRoute: ActivatedRoute,
    private serialnos: SerialnoService,
    public role :RoleservicesService
  ) { }

  async ngOnInit() {
    this.id = this.aRoute.snapshot.queryParams["id"];
    await this.createForm();
    await this.edit();
    if(this.role.getroleid() > 888){
      await this.getBusiness()
      await this.getinvoice();
      }
  else{
    console.log("this.role.getbusiness()",this.role.getbusiness());
    this.editserial.get('bid').setValue(this.role.getbusiness());
    await this.getinvoice();
  }
    // await this.getBusiness();
    // await this.getinvoice();
    await this.getitem();
    await this.getserialno()

   
    
  }
  async edit() {
    this.editdata = await this.serialnos.getmodel_serial_no({ id: this.id });
    console.log("edit ",this.editdata)
    this.createForm();
    this.getitem()
  }



  metavalue() {
    this.bulkmeta = [
      {
        msg: "Please fill Serial No",
        label: "SerialNo*",
        assign_to: "SerialNo",
        required: true,
      },
  
    ];
    return this.bulkmeta;
  }

  

  async getBusiness(event ='') {
    this.getbusinessd = await this.bussiness.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
  }



  async getinvoice(event ='') {
    this.getinvoiced = await this.invoiceser.getinvoice({like:event, busid:this.editserial.value['bid']})
    this.getinvoice1=this.getinvoiced[0]
    console.log("invoice in edit ", this.getinvoice1);
  }

  changeinvoicef( ) {
    this.editserial.controls.itemname.setValue("");
  }


  async getitem() {
    // console.log("edit data item only",this.editdata.inv_itemid ,"&& " ,this.editserial.value['invno'] );
    let vv =this.editserial.value['invno'] ;
// console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",vv);    
    this.getiteml = await this.invoiceser.getinvoice_item_edit({ id: this.editserial.value['invno'] })
    this.getiteml1 = this.getiteml[0]
    console.log("invoice ", this.getiteml1);
    this.itemmap = this.getiteml1.filter((x)=> x.iiid == vv ).map(x => x.itemqty);
    // this.itemmap1=this.getiteml1.map(x => x.itemqty);
    // console.log("item quty",this.itemmap);
    // console.log("item qty1",this.itemmap1);
    
    // this.getval('')
  }


  getval(event){
    console.log("event!!!!!!!!!!!",this.itemmap1);
    this.count =event.itemqty || this.itemmap 
    console.log("item val",this.count);
  }



 async getserialno(){
this.getserial =await this.serialnos.getserial_no({id: this.id});
console.log("serail no",this.getserial);
this.assignadd=this.getserial[0];
for (let item of this.assignadd) {
  this.addMaterial(item.serial_num , item.model_sid)
console.log("serial no @@@@@@@@@@:" ,item.serial_num)
  }

 }


  Download() {
    const worksheet: JSXLSX.WorkSheet = JSXLSX.utils.json_to_sheet(this.failure);
    // console.log('failure thwr ######3', this.failure)
    const wb: JSXLSX.WorkBook = JSXLSX.utils.book_new();
    JSXLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");
    /* save to file */
    JSXLSX.writeFile(wb, "stb_failed_report" + EXCEL_EXTENSION);
  }


  async addchannelsrv() {
    this.submit = true;
    const invalid = [];
    const control = this.ctrl
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
        console.log('data missing ', name);
      }
    }
    if (this.editserial.invalid) {
      return;
    }

    this.editserial.value["serialid"] = this.id;
      let result = await this.serialnos.editserial(this.editserial.value);
      if (result && result[0].err_code == 0) {
        this.toast.success(" ",result[0]["msg"]);
        this.route.navigate(["/pages/vendor/list-serial"]);
      } else {
        this.toast.warning(" ",result[0]["msg"]);
    }    
    console.log("add@@@", this.editserial.value);
   }


  

  changeListener(file) {
    this.file = file;
    this.filereader(this.file, (result) => {
      this.bulk = result;
      console.log("result............", this.bulk);
    });
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
    return this.editserial.get('serial_num') as FormArray;
  }

  addMaterial(serial_num =0,model_sid =0 ) {
    this.serial_num.push(this.createinvoice(serial_num ,model_sid));
  }

  deleteMatField(index: number) {
    this.serial_num.removeAt(index);
  }



  createinvoice(serial_num =0,model_sid=0): FormGroup {
    return this.fb.group({
      serialno: [ serial_num ],
      id:[model_sid ? model_sid : '']    
    });
  }




  


  get ctrl() {
    return this.editserial.controls
  }


  createForm() {
    this.editserial = new FormGroup({
      bid: new FormControl(this.editdata?.bid || "", Validators.required),
      invno: new FormControl(this.editdata?.id|| "", Validators.required),
      itemname: new FormControl(this.editdata?.inv_itemid || "", Validators.required),
      modetype: new FormControl(1, Validators.required),
      serial_num: new FormArray([]),
    });
  }

  get val() {
    return this.editserial.value;
  }
}
