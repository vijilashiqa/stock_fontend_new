/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ErrorInterceptor } from './pages/_services/jwtresponse.service';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import{ LogService} from '../app/pages/_services/log.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {
  
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { VendordetailsRoutingModule } from './pages/vendordetails/vendordetails-routing.module';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsRoutingModule } from './pages/forms/forms-routing.module';
import { FormsModule } from './pages/forms/forms.module';
import { RouterModule } from '@angular/router';
import { environment as env } from '../environments/environment';
import { RoleservicesService } from './pages/_services/roleservices.service';
import { JwtrequestService } from './pages/_services/jwtrequest.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './pages/login/login.component';
import { NbLogoutComponent } from '@nebular/auth';

import * as io from 'ngx-socket-io';
const config:io.SocketIoConfig = { url:env.baseUrl, options:{} }  
@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    // NbLogoutComponent,
  ],
  imports: [
    // CommonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    // NbToastrModule.forRoot(config),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    // NbToastrModule.forRoot(),
    ToastrModule.forRoot(),
    NbDatepickerModule,

    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ToasterModule.forRoot(),
    // TreeModule.forRoot(),
//    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
     NgbModule,
     io.SocketIoModule.forRoot(config)
     
     
    
  ],
  bootstrap: [AppComponent],
  providers: [LogService, RoleservicesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtrequestService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
