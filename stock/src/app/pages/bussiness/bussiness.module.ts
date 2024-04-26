

import { BussinessRoutingModule } from './bussiness-routing.module';
import { AddBussinessComponent } from './add-bussiness/add-bussiness.component';
import { ListBussinessComponent } from './list-bussiness/list-bussiness.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { AutoCompleteNModule } from "../auto-complete-module/auto-completen-module";

import { NbButtonModule, NbCardModule, NbSpinnerModule, NbTabsetModule } from "@nebular/theme";
import { PagerService } from '../_services/pager.service';
import { EditBussinessComponent } from './edit-bussiness/edit-bussiness.component';


@NgModule({
  declarations: [
    AddBussinessComponent,
    ListBussinessComponent,
    EditBussinessComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteNModule,
    ThemeModule,
    NbSpinnerModule,
    NbButtonModule,
    NbTabsetModule,
    BussinessRoutingModule
  ],

  providers: [
    
    PagerService ,
  ],
})
export class BussinessModule { }
