import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, NavigationStart } from '@angular/router';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate  {
    cuser; menu_access;idd

    

    constructor(
        private router: Router, 
    ) {
        this.cuser = JSON.parse(localStorage.getItem('userinfo'));
    }

    validate(id) {
        console.log("idddddddddddddddddd",id)
        const parsedUrl = new URL(window.location.href);
        const baseUrl = parsedUrl.href;
        console.log("trert",baseUrl  , "dsasf",parsedUrl);
        
        if (!(this.menu_access.find(x => x == id))) {
            this.router.navigate(['/pages/404']);
        }
    }
    canActivate() {
        setTimeout(() => {
            // console.log("userinfo1", this.cuser)
            this.cuser = JSON.parse(localStorage.getItem('userinfo'));
            this.menu_access = this.cuser ? JSON.parse(this.cuser['umenu']) : [];

            console.log("menu access", this.menu_access)
            var menu = (this.router.url).split('/');
            console.log("URL @@@@@@@@@@@@", menu[2])
            if (!this.cuser) {
                // not logged in so redirect to login page with the return url
                this.router.navigate(['auth/login']);
                // this.router.navigate(['/pages/iot-dashboard']);
                return false;
            }
            // else {
            //     this.router.navigate(['/pages/iot-dashboard']);
            // }

            else {
                switch (menu[3]) {
                    case "list-state":
                        this.validate(1002);
                        break;
                    case "add-state":
                        this.validate(1001);
                        break;
                    case "edit-state":
                        this.validate(1003);
                        break;
                    case "list-district":
                        this.validate(1005);
                        break;
                    case "add-district":
                        this.validate(1004);
                        break;
                    case "edit-district":
                        this.validate(1006);
                        break;
                    case "add-hub":
                        this.validate(1007);
                        break;
                    case "list-hub":
                        this.validate(1008);
                        break;
                    case "edit-hub":
                        this.validate(1009);
                        break;
                    case "add-user":
                        this.validate(2001);
                        break;
                    case "list-user":
                        this.validate(2002);
                        break;
                    case "edit-user":
                        this.validate(2003);
                        break;
                    case "list-admin":
                        this.validate(2004);
                        break;
                    case "edit-admin":
                        this.validate(2005);
                        break;
                    case "add-business":
                        this.validate(3001);
                        break;
                    case "list-business":
                        this.validate(3002);
                        break;
                    case "edit-business":
                        this.validate(3003);
                        break;
                    case "AddVendor":
                        this.validate(4001);
                        break;
                    case "listVendor":
                        this.validate(4002);
                        break;
                    case "editVendor":
                        this.validate(4003);
                        break;
                    case "add-invoice":
                        this.validate(5001);
                        break;
                    case "list-invoice":
                        this.validate(5002);
                        break;
                    case "edit-invoice":
                        this.validate(5003);
                        break;
                    case "add-serial":
                        this.validate(5004);
                        break;
                    case "list-serial":
                        this.validate(5005);
                        break;
                    case "edit-serial":
                        this.validate(5006);
                        break;
                    case "list-make":
                        this.validate(6002);
                        break;
                    case "edit-make":
                        this.validate(6003);
                        break;
                    case "add-make":
                        this.validate(6001);
                        break;
                    case "list-device":
                        this.validate(6005);
                        break;
                    case "add-device":
                        this.validate(6004);
                        break;
                    case "edit-device":
                        this.validate(6006);
                        break;
                    case "list-model":
                        this.validate(6008);
                        break;
                    case "add-model":
                        this.validate(6007);
                        break;
                    case "edit-model":
                        this.validate(6009);
                        break;
                    case "list-hsn":
                        this.validate(6011);
                        break;
                    case "list-hsn":
                        this.validate(6010);
                        break;
                    case "edit-hsn":
                        this.validate(6012);
                        break;
                    case "add-ownuse":
                        this.validate(7001);
                        break;
                    case "list-ownuse":
                        this.validate(7002);
                        break;
                    case "edit-ownuse":
                        this.validate(7003);
                        break;
                    default:
                        if (menu[2] == 'dashboard') {
                            return true;
                        } else {
                            this.router.navigate(['auth/login']);
                        }
                        break;
                }
            }

        }, 1);
        if (!localStorage.getItem('userinfo')) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
}