import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddStateComponent } from "./State/add-state/add-state.component";
import { ListStateComponent } from "./State/list-state/list-state.component";
import { ListDistrictComponent } from "./district/list-district/list-district.component";
import { AddDistrictComponent } from "./district/add-district/add-district.component";
import { ListHsnComponent } from "../vendordetails/hsn/list-hsn/list-hsn.component";
import { ListHubComponent } from "./hub/list-hub/list-hub.component";
import { AuthGuard } from "../_services/indexservice";

import { AddHubComponent } from "./hub/add-hub/add-hub.component";

const routes: Routes = [



  {
    path: "add-hub",

    component: AddHubComponent,
  },
      {
        path: "add-state",
        component: AddStateComponent,
        canActivate: [AuthGuard],
      },

      {
        path: "list-state",

        component: ListStateComponent,
      },

      {
        path: "add-district",

        component: AddDistrictComponent,

        canActivate: [AuthGuard],
      },

      {
        path: "list-district",

        component: ListDistrictComponent,
      },

      {
        path: "list-hub",

        component: ListHubComponent,
      },

      
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeoRoutingModule {}

export const routedComponents = [

  AddStateComponent,
  ListStateComponent,
  ListHubComponent,

  ListDistrictComponent,
  AddDistrictComponent,
];
