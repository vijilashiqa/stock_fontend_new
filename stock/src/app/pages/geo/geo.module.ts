import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeoRoutingModule, routedComponents } from './geo-routing.module';
import { AddStateComponent } from './State/add-state/add-state.component';
import { NbButtonModule, NbCardModule, NbSpinnerModule, NbTabsetModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteNModule } from '../auto-complete-module/auto-completen-module';
import { ThemeModule } from '../../@theme/theme.module';
import { PagerService } from '../_services/pager.service';
import { AddDistrictComponent } from './district/add-district/add-district.component';
import { ListDistrictComponent } from './district/list-district/list-district.component';
import { ListStateComponent } from './State/list-state/list-state.component';
import { AddHubComponent } from './hub/add-hub/add-hub.component';
import { ListHubComponent } from './hub/list-hub/list-hub.component';
import { AddSerialnoComponent } from './hub/add-serialno/add-serialno.component';
@NgModule({
  declarations: [
    // routedComponents,
    AddStateComponent,
    ListStateComponent,
    AddDistrictComponent,
    ListDistrictComponent,
    AddHubComponent,
    ListHubComponent,
    AddSerialnoComponent,
  ],
  imports: [
    NbCardModule,
    ReactiveFormsModule,
    CommonModule,
    GeoRoutingModule,
    CommonModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteNModule,
    ThemeModule,
    NbButtonModule,
    NbSpinnerModule,
    NbTabsetModule,
  ],

  providers: [
    PagerService
  ],
  entryComponents:[
    AddStateComponent,
    AddDistrictComponent,
  ]
})
export class GeoModule { }
