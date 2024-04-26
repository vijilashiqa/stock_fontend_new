import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NbToastrService,} from '@nebular/theme';
import { StateService } from '../../../_services/state.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngx-add-country',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.scss']
})
export class AddStateComponent {
  modalHeader: string;
  submit: boolean = false; stateForm;editdatas;editdata
  ;id;result1;item
  @Input() title: string;   
  constructor(

     private state : StateService,
    public activeModal: NgbActiveModal,
     private toast: NbToastrService,
    ){}

  async ngOnInit(){
    console.log("item@@@@@@@@@@@@@ in ngoninit",this.item);
    this.createForm();
    if(this.item){
       await this.edit();
      this.createForm();
    }
    
  }
 async Country() {
 console.log("data@@@@@@@@@",this.stateForm.value);
  
    this.submit = true;
    if (!this.stateForm.valid) {
      return;
    }
    let method = this.item ? 'editstate' : 'addstate';
    if (this.item) this.stateForm.value['state_pk'] = this.item
    let result = await this.state[method](this.stateForm.value)
    console.log("result",result[0]);
    if (result && result[0]['err_code'] == 0) {
       this.toast.success("",result[0]['msg']);
       this.close();
    } else {
      this.toast.warning("",result[0]['msg'])
    }
}

  async edit(){
    console.log("item@@@@@@@@@@@@@",this.item);
    this.editdata = await this.state.getstateedit({ state_pk : this.item });
    console.log("edit data",this.editdata)
  }


close(){
  this.activeModal.close();
}
async createForm() {
    this.stateForm = new FormGroup({
      state_name: new FormControl(this.editdata?.state_name || '', Validators.required)
    });
  }
}
