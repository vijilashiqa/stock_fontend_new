import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxPipe } from './pipe';



@NgModule({
  declarations: [
  
    TaxPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TaxPipe
  ]
})
export class ShareModule { }
