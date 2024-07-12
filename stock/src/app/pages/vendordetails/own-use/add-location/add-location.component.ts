import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { StateService } from "../../../_services/state.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DistrictService } from "../../../_services/district.service";
import { OwnuseService } from "../../../_services/ownuse.service";
import { HubService } from "../../../_services/hub.service";
@Component({
  selector: "ngx-add-location",
  templateUrl: "./add-location.component.html",
  styleUrls: ["./add-location.component.scss"],
})
export class AddLocationComponent {
  modalHeader: string;
  submit: boolean = false;
  addLocationForm;
  editdatas;
  editdata;
  id;
  result1; getstates;dropdata;dist
  item;
  // @Input() modalHeader : string;
  constructor(
    private locationser: OwnuseService,
    private stateser: StateService,
    private districtser: DistrictService,
    public activeModal: NgbActiveModal,
    private hubservices :HubService,
    private toast: NbToastrService
  ) {}

  async ngOnInit() {
    console.log("item@@@@@@@@@@@@@ in ngoninit", this.item);
    this.createForm();
    await this.getstate();
    await this.gethub()
    if (this.item) {
      await this.edit();
      this.createForm();
    }
  }
  async Country() {
    console.log("data@@@@@@@@@", this.addLocationForm.value);

    this.submit = true;
    if (!this.addLocationForm.valid) {
      return;
    }
    if (this.item) this.addLocationForm.value["ownid"] = this.item;
    let result = await this.locationser.addown_location(this.addLocationForm.value);
    console.log("result", result[0]);
    if (result && result[0]["err_code"] == 0) {
      this.toast.success("", result[0]["msg"]);
      this.close();
    } else {
      this.toast.warning("", result[0]["msg"]);
    }
  }


  
  changestates(){

    this.addLocationForm.controls.districtid.setValue("");
  }

 
  async getstate($event = "") {
    this.getstates = await this.stateser.getstate({ like: $event });
    console.log("state", this.getstates);
  }

  dropdown($event) {
    this.dropdata = $event.state_pk;
    console.log("drop",this.dropdata)
     this.getdistrict( "") 
    }

  async getdistrict($event = "") {
    this.dist = await this.districtser.getdistrict({
      state_fk: this.dropdata,
      like: $event,
    });
  }


gethublist

  async gethub(even=''){


    this.gethublist = await this.hubservices.gethub({like :event})
    console.log("GET HUB ",this.gethublist);
    

  }
  async edit() {
    // console.log("item@@@@@@@@@@@@@", this.item);
    // this.editdata = await this.state.getstateedit({ state_pk: this.item });
    // console.log("edit data", this.editdata);
  }

  close() {
    this.activeModal.close();
  }
  async createForm() {
    this.addLocationForm = new FormGroup({
      stateid: new FormControl(
        this.editdata?.stateid || "",
        Validators.required
      ),

      districtid :new FormControl(
        this.editdata?.districtid || "",
        Validators.required
      ),
      locname :new FormControl(
        this.editdata?.locname || "",
        Validators.required
      ),


      locaddress :new FormControl(
        this.editdata?.locaddress || "",
        Validators.required
      ),
      hubid :new FormControl(this.editdata?.hubid || "",
      Validators.required),
      
    });


 
  }
}
