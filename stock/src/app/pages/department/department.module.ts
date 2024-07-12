import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { NbButtonModule, NbCardModule, NbSpinnerModule, NbTabsetModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { ThemeModule } from '../../@theme/theme.module';
import { ShareModule } from '../../share/share.module';


@NgModule({
  declarations: [
    AddDepartmentComponent,
    EditDepartmentComponent,
    ListDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    CommonModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteNModule,
    ThemeModule,
    NbButtonModule,
    NbSpinnerModule,
    // NbTabsetModule,
    // ShareModule,
  ]
})
export class DepartmentModule { }
