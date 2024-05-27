import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBussinessComponent } from './add-bussiness/add-bussiness.component';
import { ListBussinessComponent } from './list-bussiness/list-bussiness.component';
import { EditVendorComponent } from '../vendordetails/vendor/edit-vendor/edit-vendor.component';
import { EditBussinessComponent } from './edit-bussiness/edit-bussiness.component';
import { AuthGuard } from '../_services/indexservice';

const routes: Routes = [

  {

    path : 'add-business',

    component : AddBussinessComponent,
    canActivate: [AuthGuard],
  },

  {

    path : 'list-business' ,

    component : ListBussinessComponent,

    // canActivate: [AuthGuard],
  },

  {

    path :'edit-business' ,

    component : EditBussinessComponent,

    // canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BussinessRoutingModule { }
