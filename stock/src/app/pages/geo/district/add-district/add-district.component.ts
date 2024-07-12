import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../../_services/state.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NbToastrService,} from '@nebular/theme';
import { DistrictService } from '../../../_services/district.service';
@Component({
  selector: 'ngx-add-district',
  templateUrl: './add-district.component.html',
  styleUrls: ['./add-district.component.scss']
})
export class AddDistrictComponent {
  modalHeader: string;
  submit: boolean = false; stateForm; editflag = false;
  item; state; editable: boolean = false; editdata;
  initialValue; getstates; id;
  @Input() title: string;
  count;
  constructor(
     private stateas: StateService, 
     private toast: NbToastrService,
    private distric: DistrictService,

    private activemodel: NgbActiveModal) { }
  async ngOnInit() {
   await this.createForm();
   await this.getCountry();
    if (this.item) {
       await this.edit();
      await this.createForm();
      // await this.getCountry();
    }
  }

  async AddState() {
    this.submit = true;
    if (!this.stateForm.valid) {
      return;
    }
     let method = this.item ? 'editdistrict' : 'adddist';
    if (this.item) this.stateForm.value['district_pk'] = this.item;
    let result = await this.distric[method](this.stateForm.value)
    if (result && result[0]['err_code'] == 0) {
      this.toast.success("",result[0]['msg']);
      this.close();
    } else {
      this.toast.warning("",result[0]['msg'])
    }
  }
  async getCountry(event = '') {
    console.log("list state");
    
    this.count = await this.stateas.getstate({ like:event});
    console.log("country",this.count);
    
  }

  async edit() {
    this.editdata = await this.distric.getdistrictedit({ district_pk: this.item });
    console.log("edit data",this.editdata)
  }



  createForm() {
    this.stateForm = new FormGroup({
      state_fk: new FormControl(this.editdata?.state_pk || '', Validators.required),
      district_name: new FormControl(this.editdata?.district_name || '', Validators.required) });
  }

  close() {
    this.activemodel.close();
  }

}
