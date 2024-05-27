import { NgModule } from "@angular/core";
import { AddVendorComponent } from "./vendor/add-vendor/add-vendor.component";
import { RouterModule, Routes } from "@angular/router";
import { ListvendorComponent } from "./vendor/listvendor/listvendor.component";
import { EditVendorComponent } from "./vendor/edit-vendor/edit-vendor.component";
import { AddHsnComponent } from "./hsn/add-hsn/add-hsn.component";
import { ListHsnComponent } from "./hsn/list-hsn/list-hsn.component";
import { AddInvoiceComponent } from "./invoice/add-invoice/add-invoice.component";
import { ListInvoiceComponent } from "./invoice/list-invoice/list-invoice.component";
import { EditInvoiceComponent } from "./invoice/edit-invoice/edit-invoice.component";
import { AddMakeComponent } from "./make/add-make/add-make.component";
import { ListMakeComponent } from "./make/list-make/list-make.component";
import { AddDeviceComponent } from "./devices/add-device/add-device.component";
import { ListDeviceComponent } from "./devices/list-device/list-device.component";
import { AddModelComponent } from "./Model/add-model/add-model.component";
import { ListModelComponent } from "./Model/list-model/list-model.component";
import { AddSerialComponent } from "./serial -no/add-serial/add-serial.component";
import { ListSerialComponent } from "./serial -no/list-serial/list-serial.component";
import { EditSerialComponent } from "./serial -no/edit-serial/edit-serial.component";
import { AddOwnComponent } from "./own-use/add-own/add-own.component";
import { EditOwnComponent } from "./own-use/edit-own/edit-own.component";
import { ListOwnComponent } from "./own-use/list-own/list-own.component";
import { AuthGuard } from "../_services/indexservice";

const routes: Routes = [
  {
    path: "AddVendor",
    component: AddVendorComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "ListVendor",
    component: ListvendorComponent,
  },

  {
    path: "edit-vendor",
    component: EditVendorComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: "Add-hsn",
    component: AddHsnComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "list-hsn",
    component: ListHsnComponent,
  },
  {
    path: "add-invoice",
    component: AddInvoiceComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "list-invoice",
    component: ListInvoiceComponent,
  },

  {
    path: "edit-invoice",

    component: EditInvoiceComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: "add-make",

    component: AddMakeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "list-make",
    component: ListMakeComponent,
  },

  {
    path: "add-device",
    component: AddDeviceComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "list-device",
    component: ListDeviceComponent,
  },

  {
    path: "add-model",
    component: AddModelComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "list-model",
    component: ListModelComponent,
  },

  {
    path: "add-serial",
    component: AddSerialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "list-serial",
    component: ListSerialComponent,
  },

  {
    path: "edit-serial",
    component: EditSerialComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: "add-ownuse",
    component: AddOwnComponent,
  },

  {
    path: "edit-ownuse",
    component: EditOwnComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: "list-ownuse",
    component: ListOwnComponent,
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendordetailsRoutingModule {}

export const routedComponents = [AddVendorComponent, ListvendorComponent];
