import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { AutoCompleteNModule } from "../auto-complete-module/auto-completen-module";
import { VendordetailsRoutingModule ,routedComponents} from "./vendordetails-routing.module";
import { NbButtonModule, NbCardModule, NbSpinnerModule, NbTabsetModule } from "@nebular/theme";
import { PagerService } from "../_services/pager.service";
import { EditVendorComponent } from './vendor/edit-vendor/edit-vendor.component';
import { AddHsnComponent } from './hsn/add-hsn/add-hsn.component';
import { ListHsnComponent } from './hsn/list-hsn/list-hsn.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { ListInvoiceComponent } from './invoice/list-invoice/list-invoice.component';
import { EditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { ViewInvoiceComponent } from './invoice/view-invoice/view-invoice.component';
import { ShareModule } from "../../share/share.module";
import { ListMakeComponent } from "./make/list-make/list-make.component";
import { AddMakeComponent } from "./make/add-make/add-make.component";
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { ListDeviceComponent } from './devices/list-device/list-device.component';
import { AddModelComponent } from './Model/add-model/add-model.component';
import { ListModelComponent } from './Model/list-model/list-model.component';
import { AddSerialComponent } from './serial -no/add-serial/add-serial.component';
import { ListSerialComponent } from './serial -no/list-serial/list-serial.component';
import { EditSerialComponent } from './serial -no/edit-serial/edit-serial.component';
import { AddOwnComponent } from './own-use/add-own/add-own.component';
import { EditOwnComponent } from './own-use/edit-own/edit-own.component';
import { ListOwnComponent } from './own-use/list-own/list-own.component';
import { AddLocationComponent } from './own-use/add-location/add-location.component';

@NgModule({
  declarations: [...routedComponents, EditVendorComponent, AddHsnComponent, AddMakeComponent,ListHsnComponent, AddInvoiceComponent, ListInvoiceComponent, EditInvoiceComponent, ViewInvoiceComponent,ListMakeComponent, AddDeviceComponent, ListDeviceComponent, AddModelComponent, ListModelComponent, AddSerialComponent, ListSerialComponent, EditSerialComponent, AddOwnComponent, EditOwnComponent, ListOwnComponent, AddLocationComponent],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteNModule,
    ThemeModule,
    NbButtonModule,
    NbSpinnerModule,
    NbTabsetModule,
    VendordetailsRoutingModule,
    ShareModule,
  ],

  providers: [
    
    PagerService 
  ],


  // entryComponents:[
  //   AddMakeComponent,
    
  // ] 
  

})
export class VendordetailsModule {}
