import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
// import { HeadendService, RoleservicesService } from '../../_services';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

import { HsnService } from "../../../_services/hsn.service";
import { BusinessService } from "../../../_services/business.service";
import { VendorService } from "../../../_services/vendor.service";
import { NbToastrService } from "@nebular/theme";
import { InvoiceService } from "../../../_services/invoice.service";
import { DeviceService } from "../../../_services/device.service";
import { MakeService } from "../../../_services/make.service";
import { ModelService } from "../../../_services/model.service";

@Component({
  selector: "ngx-edit-invoice",
  templateUrl: "./edit-invoice.component.html",
  styleUrls: ["./edit-invoice.component.scss"],
})
export class EditInvoiceComponent {
  submit: boolean = false;
  editinvoice;
  getbusinessd;
  getbuss;
  getvendorlist;
  getvendora;
  gethsn;
  editfirstarray;
  getvend;
  vendors;
  loc;
  STB;
  getbusinessaddres;
  editdata = {};
  id;
  editflag = false;
  editable: boolean = false;
  getadd; item1
  getvd; indexi
  getgst1; countitem;
  materialArray; dropdata
  reduceaddress;
  slice2; gsttypevalue
  reducesvendor;
  sllice1; itemqty
  getinvoice2; getdevicel; getmakel; getmodell
  disabled; itemgst; getmodel2; dropdata1
  getinvoicel;
  vall; itemsgstt; itemcgst; itemigstt
  getinvoicelitem; item; itemamt;
  amount; tax; total

  constructor(
    private _fb: FormBuilder,
    private vendor: VendorService,
    private Business: BusinessService,
    private toast: NbToastrService,
    private devices: DeviceService,
    private make: MakeService,
    private route: Router,
    private models: ModelService,
    private aRoute: ActivatedRoute,
    private invoiceser: InvoiceService
  ) { }

  async ngOnInit() {
    this.id = this.aRoute.snapshot.queryParams.id;
    console.log("id@@@@@@@@@@@@@@@@", this.id);
    await this.createForm();
    await this.getinvoice();
// this.change();
    await this.Changedata();
    await this.getinvoiceitem();
    await this.getBusiness();
    await this.getbusinessaddress("");
    await this.changeaddress();
    await this.getVendor();
    await this.getvendoraddrs();
    await this.getdevice();
    await this.getmodel();
    await this.getmake();
    // this.addvalidation(0)
     this.onSomeEvent()
  }
  async editinvoicef() {
    this.submit = true;
    const invalid = [];
    const control = this.editinvoice.controls;
    for (const name in control) {
      if (control[name].invalid) {
        invalid.push(name);
      }
    }
    if (this.editinvoice.invalid) {
      console.log("Invalid value -----", invalid);
      return;
    }

    // console.log("edit the form",this.editinvoice.value)
    if (this.id) this.editinvoice.value["id"] = this.id;
    // let result = await this.vendorservices.vendoredit(this.editinvoice.value);
    let result = await this.invoiceser.editinvoice(this.editinvoice.value);
    // console.log('result@@@@@@',result);
    if (result[0]["err_code"] == 0) {
      this.toast.success("", result[0]["msg"]);
      this.route.navigate(["/pages/vendor/list-invoice"]);
    } else {
      this.toast.warning("", result[0]["msg"]);
    }
  }
  async getBusiness() {
    this.getbusinessd = await this.Business.getbusiness({});
    this.getbuss = this.getbusinessd[0];
    // console.log("get business ", this.getbuss);
  }
  async getbusinessaddress($event) {
    this.getbusinessaddres = await this.Business.getbusinessaddredit({
      id: this.editinvoice.value["busid"],
      like: $event,
    });
    this.getadd = this.getbusinessaddres[0];
    await this.Changedata()
  }

  async Changedata() {
    // console.log("daaas########", this.getinvoice2.busgstno);
    let opp = this.editinvoice.value["busaddr"] || this.getinvoice2.busgstno;
    let dd = this.getadd?.filter((id) => id.id == opp).map((id) => id.bagstno);
    // console.log("ddddddddddddddddddddddddd%%%%%%%%%%555",this.getadd);
    this.reduceaddress = dd?.reduce((a, v) => ({ ...a, v }));
    this.slice2 = this.reduceaddress?.slice(0, 2);
    // console.log("slice@@@@@@@@@@ 1", this.slice2);
    await this.disable();
  }

  async getVendor() {
    this.getvendorlist = await this.vendor.listvendor({});
    this.getvend = this.getvendorlist[0];
  }
  async getvendoraddrs() {
    this.getvendora = await this.vendor.getvendoraddreditd({
      id: this.editinvoice.value["vendorid"],
    });
    this.getvd = this.getvendora[0];
    // console.log("vendor address ",this.getvd);

    let getgst = this.getvd.gst_no;
    await this.changeaddress()
  }

  async changeaddress() {
    let opp1 = this.editinvoice.value["vaddr"] || this.getinvoice2.vgstno;
    // console.log("change address", opp1);
    let dd = this.getvd?.filter((id) => id.id == opp1).map((id) => id.gst_no);
    // console.log("reduce",dd)
    this.reducesvendor = dd?.reduce((a, v) => ({ ...a, v }));
    this.sllice1 = this.reducesvendor?.slice(0, 2);
    // console.log("slice@@@@@@@@@@ 22@", this.sllice1);
    await this.disable();
  }

  async getinvoiceitem() {
    this.getinvoicelitem = await this.invoiceser.getinvoice_item_edit({
      id: this.id,
    });
    // console.log("edit the item", this.getinvoicelitem[0]);
    this.item1 = this.getinvoicelitem[0];
    this.countitem = this.getinvoicelitem[1].cnt;

    // console.log("count@@@@@@@@@@@@@@@",this.countitem);


    for (let item of this.item1) {
      console.log("item status split*****", this.item1.length);

      // console.log("igst", item.igst ,"sgst", item.sgst ,"cgs",item.cgst,"amount", item.itemamt,"gst type",item.itemgst , 'id', item.iiid );
      console.log("slice in the item", this.sllice1, this.slice2);

      let taxper = Number(item.sgst || this.editinvoice.value['sgst']) + Number(item.cgst || this.editinvoice.value['cgst']) || Number(item.igst || this.editinvoice.value['igst']);
      console.log("tax per amount", taxper);
      let res = await this.taxcal(Number(item.itemgst), Number(item.itemamt), taxper);
      console.log('resssppp', res);
      this.amount = Number(res["amt"]);
      this.tax = Number(res["taxamt"]);
      this.total = Math.round(Number(this.amount + this.tax) * Math.round(Number(item.itemqty)));
      console.log("total ^^^^^^^^^^^^^", this.total);
      this.addMaterial(
        //  item.itemname,
        item.modelid,
        item.makeid,
        item.deviceid,
        item.igst,
        item.sgst,
        item.cgst,
        item.itemqty,
        item.itemamt,
        item.itemstatus,
        item.itemgst,
        item.iiid,
        this.total);
      console.log("item gst", item);

    }


  }
  changedr() {
    console.log("clear");
    this.invoiceForm.reset();
    this.invoiceForm.removeAt(1);
    this.editinvoice.controls["igst"].setValue("");
    this.editinvoice.controls["sgst"].setValue("");
    this.editinvoice.controls["cgst"].setValue("");
  }
  async disable() {
    console.log("slice in disable", this.sllice1);
    console.log("slice in disable", this.slice2);
    if (this.sllice1 == this.slice2) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  dropdown($event) {
    this.dropdata = $event.makeid;
    // console.log("drop make",this.dropdata)
    //  this.getdistrict( "") 
    this.getmodel()
  }
  async getmake() {
    this.getmakel = await this.make.selectmake({});
    // console.log("get make ", this.getmakel);
  }
  dropdownd($event) {
    this.dropdata1 = $event.deviceid;
    // console.log("drop device",this.dropdata1)
    //  this.getdistrict( "") 
    this.getmodel()
  }

  async getdevice() {
    this.getdevicel = await this.devices.selectdevice({});
    // console.log("get device ", this.getdevicel);

  }

  async getmodel() {

    this.getmodell = await this.invoiceser.getmodel_edit({ makeid: this.dropdata, deviceid: this.dropdata1 });
    this.getmodel2 = this.getmodell[0]
    // console.log("get model", this.getmodel2);

  }



  async getinvoice() {
    this.getinvoicel = await this.invoiceser.getinvoice_edit({ id: this.id });
    this.getinvoice2 = this.getinvoicel[0][0];
    await this.createForm();
    // console.log("get edit  common", this.getinvoice2);
  }

  async onkeyupQty(event: any, index: number) {
    let taxper = Number((this.editinvoice.value["invoiceid"][index]["sgst"] || this.editinvoice.value['sgst'])) + Number(this.editinvoice.value["invoiceid"][index]["cgst"] || this.editinvoice.value['cgst']) || Number(this.editinvoice.value["invoiceid"][index]["igst"] || this.editinvoice.value['igst']);
    // console.log("tax per amount",taxper);
    let res = await this.taxcal(Number(this.editinvoice.value["invoiceid"][index]["itemgst"]), Number(this.editinvoice.value["invoiceid"][index]["itemamt"]), taxper);
    // console.log("responce@@@@@@2", res);
    let amount = Number(res["amt"]);
    let tax = Number(res["taxamt"]);
    let total = Number(amount + tax) * Number(this.editinvoice.value["invoiceid"][index]["itemqty"])
    const controlArray = <FormArray>this.editinvoice.get('invoiceid');
    controlArray.controls[index].get('total').setValue(total);

  }

  async taxcal(itemtaxtype, amount, taxper) {
    // console.log(".....tax type.....", itemtaxtype);
    //    console.log("........amount.......",amount);
    //    console.log("..............taax share",taxper);
    if (itemtaxtype == 0) {
      //  console.log("Inclusive");

      var amt = (Number(amount) / ((100 + taxper) / 100)).toFixed(2);
      var taxamt = (Number(amount) - Number(amt)).toFixed(2);
      return { amt: amt, taxamt: taxamt };
    } else {
      // console.log("Exclusive");


      var amt = Number(amount).toFixed(2);
      var taxamt = (Number(amount * taxper) / 100).toFixed(2);
      return { amt: amt, taxamt: taxamt };
    }
  }

  addMaterial(
    // itemname = "",
    modelid = 0,
    makeid = 0,
    deviceid = 0,
    igst = 0,
    sgst = 0,
    cgst = 0,
    itemqty = "",
    itemamt = 0,
    itemstatus = 0,
    itemgst = "",
    iiid = 0,

    total = 0
  ) {
    this.invoiceForm.push(
      this.createinvoice(
        // itemname,
        modelid,
        makeid,
        deviceid,
        igst,
        sgst,
        cgst,
        itemqty,
        itemamt,
        itemstatus,
        itemgst,
        iiid,
        total
      )
    );
  }

  deleteMatField(index: number) {
    this.invoiceForm.removeAt(index);
  }

  createinvoice(
    // itemname = "",
    modelid = 0,
    makeid = 0,
    deviceid = 0,
    igst = 0,
    sgst = 0,
    cgst = 0,
    itemqty = "",
    itemamt = 0,
    itemstatus = 0,
    itemgst = " ",
    iiid = 0,

    total
  ): FormGroup {
    console.log("create invoice", itemgst);
    return this._fb.group({
      modelid: [modelid || "", Validators.required],
      makeid: [makeid || "", Validators.required],
      deviceid: [deviceid || "", Validators.required],
      igst: [igst],
      sgst: [sgst],
      cgst: [cgst],
      itemqty: [itemqty || "", Validators.required],
      itemgst: [itemgst, Validators.required],
      itemamt: [itemamt || "", Validators.required],
      total: [{ value: total || '', disabled: true }],
      vastatus: [itemstatus],
      id: iiid ? iiid : '',
    });
  }


  get invoiceFormCtrl() {
    return this.invoiceForm.controls;
  }
  get ctrl() {
    return this.editinvoice.controls;
  }
  get invoiceForm(): FormArray {
    return this.ctrl.invoiceid as FormArray;
  }
  getInvoiceByIndex(i: number) {
    return this.invoiceFormCtrl[i]["controls"];
  }




  changemodel(index: number) {
    this.invoiceForm.at(index).get('modelid').setValue('');
  }



  changegstype(event) {
    console.log(" gst ttype", event.target.value, " disable", this.disabled);
    this.gsttypevalue = event.target.value;

  }


  addvalidation(idx: number) {

    // this.getInvoiceByIndex(idx).get('sgst').clearValidators();

console.log("index@@@@@@@@@@", this.getInvoiceByIndex(idx).cgst);

    const controlArray = <FormArray>this.editinvoice.get('invoiceid');
    console.log("disable @@@@@@@@", this.disabled, "gst type", this.getinvoice2?.["gsttype"], "index", idx);
    // console.log(" controlArray.controls[idx].get('sgst')", controlArray.at(index);)
    if (this.gsttypevalue == 0 || this.getinvoice2?.["gsttype"] && this.disabled == false) {
      this.editinvoice.get('sgst').clearValidators();
      this.editinvoice.get('sgst').updateValueAndValidity();
      this.editinvoice.get('cgst').clearValidators();
      this.editinvoice.get('cgst').updateValueAndValidity();
      this.editinvoice.get('igst').clearValidators();
      this.editinvoice.get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('sgst').clearValidators();
      controlArray.controls[idx].get('sgst').updateValueAndValidity();
      controlArray.controls[idx].get('cgst').clearValidators();
      controlArray.controls[idx].get('cgst').updateValueAndValidity();
      controlArray.controls[idx].get('igst').setValidators(Validators.required);
      controlArray.controls[idx].get('igst').updateValueAndValidity();
    }
    if (this.gsttypevalue == 0 || this.getinvoice2?.["gsttype"] && this.disabled == true) {
      this.editinvoice.get('sgst').clearValidators();
      this.editinvoice.get('sgst').updateValueAndValidity();
      this.editinvoice.get('cgst').clearValidators();
      this.editinvoice.get('cgst').updateValueAndValidity();
      this.editinvoice.get('igst').clearValidators();
      this.editinvoice.get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('igst').clearValidators();
      controlArray.controls[idx].get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('cgst').setValidators(Validators.required);
      controlArray.controls[idx].get('cgst').updateValueAndValidity();
      controlArray.controls[idx].get('sgst').setValidators(Validators.required);
      controlArray.controls[idx].get('sgst').updateValueAndValidity();
    }

    if (this.gsttypevalue == 1 || this.getinvoice2?.["gsttype"] && this.disabled == true) {
      this.editinvoice.get('igst').clearValidators();
      this.editinvoice.get('igst').updateValueAndValidity();
      this.editinvoice.get('sgst').setValidators(Validators.required);
      this.editinvoice.get('sgst').updateValueAndValidity();
      this.editinvoice.get('cgst').setValidators(Validators.required);
      this.editinvoice.get('cgst').updateValueAndValidity();
      controlArray.controls[idx].get('igst').clearValidators();
      controlArray.controls[idx].get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('sgst').clearValidators();
      controlArray.controls[idx].get('sgst').updateValueAndValidity();
      controlArray.controls[idx].get('cgst').clearValidators();
      controlArray.controls[idx].get('cgst').updateValueAndValidity();
    }
    if (this.gsttypevalue == 1 || this.getinvoice2?.["gsttype"] && this.disabled == false) {
      this.editinvoice.get('sgst').clearValidators();
      this.editinvoice.get('sgst').updateValueAndValidity();
      this.editinvoice.get('cgst').clearValidators();
      this.editinvoice.get('cgst').updateValueAndValidity();
      controlArray.controls[idx].get('igst').clearValidators();
      controlArray.controls[idx].get('igst').updateValueAndValidity();
      controlArray.controls[idx].get('sgst').clearValidators();
      controlArray.controls[idx].get('sgst').updateValueAndValidity();
      controlArray.controls[idx].get('cgst').clearValidators();
      controlArray.controls[idx].get('cgst').updateValueAndValidity();
    }
  }


  onSomeEvent( ) {
console.log("devicename", this.editinvoice.controls.invoiceid);


this.editinvoice.controls.invoiceid

    // const index = 1; // Replace with the actual index you want to access
    // const controlAtIndex = this.invoiceForm.at(index);
    // console.log(`Control at index ${index}:`, controlAtIndex);
  }

  changeaddres() {
    this.editinvoice.controls["busaddr"].setValue("");
  }

  changevendor() {
    this.editinvoice.controls["vaddr"].setValue("");
  }
  createForm() {
    this.editinvoice = new FormGroup({
      busid: new FormControl(
        this.getinvoice2?.["busid"] || "",
        Validators.required
      ),
      busaddr: new FormControl(
        this.getinvoice2?.["busaddrid"] || "",
        Validators.required
      ),
      vendorid: new FormControl(
        this.getinvoice2?.["vid"] || "",
        Validators.required
      ),
      vaddr: new FormControl(
        this.getinvoice2?.["vaddrid"] || "",
        Validators.required
      ),
      invno: new FormControl(
        this.getinvoice2?.["invno"] || "",
        Validators.required
      ),
      invdate: new FormControl(
        this.getinvoice2?.["invdate"].slice(0, 10) || "",
        Validators.required
      ),
      gsttype: new FormControl(
        this.getinvoice2?.["gsttype"],
        Validators.required
      ),
      igst: new FormControl(this.getinvoice2?.["igst"] ),
      sgst: new FormControl(this.getinvoice2?.["sgst"] ),
      cgst: new FormControl(this.getinvoice2?.["cgst"] ),
      invoiceid: new FormArray([]),
    });
  }


// change(){
//   this.editinvoice.invoiceid.controls.forEach(
//     control => {
//         control.valueChanges.subscribe(
//              () => {
//             console.log(this.invoiceForm.controls.indexOf(control)) // logs index of changed item in form array
//              }
//         )
//     }
// )



// }


 
}
