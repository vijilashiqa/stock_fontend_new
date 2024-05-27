// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { LogserviceService } from '../pages/_services';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from '../_services/login.service';
import { NbToastrService } from '@nebular/theme';
import { VERSION } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  UserForm: FormGroup;
  submit: boolean = false; LoginForm; mobile; tablet; desktop;
  user_pwd: boolean = false;
  deviceInfo: DeviceInfo;
  constructor(
    public router: Router,
    private loginSrv: LoginService,
    private toastsrv: NbToastrService,
    private deviceService: DeviceDetectorService
  )  {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.mobile = this.deviceService.isMobile();
    this.tablet = this.deviceService.isTablet();
    this.desktop = this.deviceService.isDesktop();
}



  login() {
    console.log(VERSION.full); 
    if (this.UserForm.invalid) {
      this.submit = true;
      return;
    }
    const md5 = new Md5;
    this.UserForm.value['pwd'] = md5.appendStr(this.UserForm.value['pwd']).end();
    this.UserForm.value['browser'] = this.deviceInfo.browser;
    this.UserForm.value['browser_version'] = this.deviceInfo.browser_version;
    this.UserForm.value['os'] = this.deviceInfo.os;
    this.UserForm.value['os_version'] = this.deviceInfo.os_version;
    this.UserForm.value['userAgent'] = this.deviceInfo.userAgent;
    this.UserForm.value['devicetype'] = this.mobile == true ? 'mobile' : this.tablet == true ? 'tablet' : this.desktop == true ? 'desktop' : 'N/A';
    this.loginSrv.login(this.UserForm.value).subscribe(result => {
      console.log( "login result",result)
      if (result[0]['status'] == 1) {
        this.toastsrv.success(" ",result[0]['msg']);
        localStorage.setItem('token', JSON.stringify(result[0]['token']))
        localStorage.setItem('ref_token', JSON.stringify(result[0]['refresh_token']))
        localStorage.setItem('userinfo', JSON.stringify(result[0]['user_details']));
        // window.localStorage.setItem('subsexp_date', result[0][1].exp_date)
        this.router.navigate(['/pages/dashboard'])
      } else {
        this.toastsrv.warning(" ",result[0]['msg']);
        localStorage.clear();
      }
    });

  }



  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
    this.createForm();
}

showPwd() {
    this.user_pwd = !this.user_pwd;
}


createForm() {
  this.UserForm = new FormGroup({
        'loginid': new FormControl('', Validators.required),
        'pwd': new FormControl('', Validators.required),
      })
}
}