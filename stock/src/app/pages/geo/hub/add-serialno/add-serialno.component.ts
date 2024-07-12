import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HsnService } from "../../../_services/hsn.service";
import { NbToastrService } from "@nebular/theme";
import { HubService } from "../../../_services/hub.service";

@Component({
  selector: 'ngx-add-serialno',
  templateUrl: './add-serialno.component.html',
  styleUrls: ['./add-serialno.component.scss']
})
export class AddSerialnoComponent {
  addserialform;
  modalHeader: string;
  submit: boolean = false;
  item;
  listhdcas;
  state: any = [];
  district: any = [];
  city: any = [];
  listpincode: any;
  listhead;
  listmake;
  getstbtypeg;
  edithsnadd ={}
  pincode: any = [];
  area;
  count;
  listarea;
  getstates;result;
  dist;
  citylist;
  editflag = false;
  editdata = {};
  @Input() title: string;
  keyword = "name";
  alert: any;
  constructor(
    private activemodel: NgbActiveModal,
    private hsn: HsnService,
    private route: Router,
    private hub:HubService,
    private toast: NbToastrService
  ) {}

  async ngOnInit() {
    console.log("item@@@@@@@@",this.item);
    await this.createForm();
    if (this.item) {

await this.getserialnofu()
    // await this.editaddhsn();
  }
}

  async addserialnof() {
    this.submit = true;
    if (this.addserialform.invalid) {
      return;
    }
    // let method = this.item ? "edithsn" : "addhsn";
     this.addserialform.value["hubid"] = this.item.hbid;
    let result = await this.hub.updateownuse(this.addserialform.value);
    console.log("add@@@",this.addserialform.value);
    if (result[0]["err_code"] == 0) {
      this.toast.success("",result[0]["msg"], );
      this.close();
      this.route.navigate(["/pages/Geo-details/list-hub"]);
    } else {
      this.toast.warning("",result[0]["msg"]);
    } 
  }

getno;getno1

  async getserialnofu()
{

this.getno = await this.hub.getserialno({ depid : this.item.depid })
this.getno1 =this.getno
console.log("get serial no", this.getno1);

await this.createForm();
}

// async editaddhsn() {
//     this.edithsnadd = await this.hsn.gethsn({id: this.item })
//     console.log('edit data%%%%%%%%%%%%%%', this.edithsnadd)
//     await this.createForm();
//   }

  close() {
    this.activemodel.close();
  }
  createForm() {
    this.addserialform = new FormGroup({
      model_sid: new FormControl(this.edithsnadd?.["model_sid"] || "", Validators.required),
    });
  }
}
