import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListMenuroleComponent } from './menurole/list-menurole/list-menurole.component';
import { AddMenuroleComponent } from './menurole/add-menurole/add-menurole.component';
import { EditMenuroleComponent } from './menurole/edit-menurole/edit-menurole.component';

import { EditUserComponent } from "./user-details/edit-user/edit-user.component";
import { AddUserComponent } from "./user-details/add-user/add-user.component";
import { ListUserComponent } from "./user-details/list-user/list-user.component";
import { AuthGuard } from "../_services/indexservice";

const routes: Routes = [
  {

    path :'list-admin',
    component :ListMenuroleComponent
  },

  {

    path :'add-admin',

    component :AddMenuroleComponent
  },

  {
    path : 'edit-admin',

    component :EditMenuroleComponent
  },

  {
    path: "add-user",
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "edit-user",
    component: EditUserComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: "list-user",
    component: ListUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
