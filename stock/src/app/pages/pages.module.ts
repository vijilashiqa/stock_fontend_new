import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";
import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { GeoModule } from "./geo/geo.module";
import { ShareModule } from "../share/share.module";
import { CommonModule } from "@angular/common";
import { VendordetailsModule } from "./vendordetails/vendordetails.module";
import { ErrormessageComponent } from './errormessage/errormessage.component';

import { AdminModule } from "./admin/admin.module";
import { DepartmentModule } from "./department/department.module";

// import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    VendordetailsModule,
    GeoModule,
    ShareModule,
    CommonModule,
    // BrowserModule
    AdminModule,
    DepartmentModule
  ],
  declarations: [PagesComponent, ErrormessageComponent],
})
export class PagesModule {}
