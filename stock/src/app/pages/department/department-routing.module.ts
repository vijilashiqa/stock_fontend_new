import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { EditBussinessComponent } from '../bussiness/edit-bussiness/edit-bussiness.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { AuthGuard } from '../_services/auth.guard';

const routes: Routes = [
  {

    path :"add-department",
    component:AddDepartmentComponent,
    canActivate: [AuthGuard],
  },

  {
    path :"list-department",
    component:ListDepartmentComponent
  },
  {
    path:"edit-department",
    component:EditDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
