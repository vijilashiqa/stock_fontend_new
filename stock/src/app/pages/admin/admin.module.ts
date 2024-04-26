import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TreeModule } from 'angular-tree-component';
import {  NbAccordionModule, NbButtonModule, NbCardModule, NbListModule, NbRadioModule, NbRouteTabsetModule, NbSpinnerModule, NbStepperModule, NbTabsetModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LayoutRoutingModule } from '../layout/layout-routing.module';
import { AddUserComponent } from './user-details/add-user/add-user.component';
import { EditUserComponent } from './user-details/edit-user/edit-user.component';
import { ListUserComponent } from './user-details/list-user/list-user.component';


import { AddMenuroleComponent } from './menurole/add-menurole/add-menurole.component';
import { EditMenuroleComponent } from './menurole/edit-menurole/edit-menurole.component';
import { ListMenuroleComponent } from './menurole/list-menurole/list-menurole.component';



@NgModule({
  declarations: [
    ListMenuroleComponent,
    AddMenuroleComponent,
    EditMenuroleComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteNModule,
    ReactiveFormsModule,
    ThemeModule,
    NbRadioModule,
    NbCardModule,
    NbStepperModule,
    Ng2SmartTableModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbButtonModule,
    NbSpinnerModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    LayoutRoutingModule,
    NbTreeGridModule,
    TreeModule.forRoot(),
    FormsModule
  ]
})
export class AdminModule { }
