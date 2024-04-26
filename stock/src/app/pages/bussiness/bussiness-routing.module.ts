import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBussinessComponent } from './add-bussiness/add-bussiness.component';
import { ListBussinessComponent } from './list-bussiness/list-bussiness.component';
import { EditVendorComponent } from '../vendordetails/vendor/edit-vendor/edit-vendor.component';
import { EditBussinessComponent } from './edit-bussiness/edit-bussiness.component';

const routes: Routes = [

  {

    path : 'add-business',

    component : AddBussinessComponent
  },

  {

    path : 'list-business' ,

    component : ListBussinessComponent
  },

  {

    path :'edit-business' ,

    component : EditBussinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BussinessRoutingModule { }
