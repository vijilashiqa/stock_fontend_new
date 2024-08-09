import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor, HttpClient, HttpBackend } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{ LogService} from '../_services/log.service'
 import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { RoleservicesService } from '../_services/roleservices.service';
import { environment as env } from '../../../environments/environment';
import {NbToastrService,} from '@nebular/theme';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logservices: LogService,
      private role: RoleservicesService,
      private http: HttpClient,
      private router: Router,
      private httpBackend: HttpBackend,
      private alert: NbToastrService
  ) { this.http = new HttpClient(this.httpBackend) }

  getRefreshToken() {
       const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'authorization': this.role.getRefreshtoken()
          })
      };
      return this.http.get<any>(env.baseUrl + "/rtoken/renewAccessToken", httpOptions)
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
      const error = (err.error || {}).message || err.statusText || err;
          if (err && err.error.status === 401) {
              if (err.error.restore === true) {
                  this.getRefreshToken().subscribe((resp) => {
                      if (resp[0]['restore'] === false) {
                          const toast: Toast = {
                              type: resp[0]['status'] == 401 ? 'warning' : 'warning',
                              title: resp[0]['status'] == 401 ? 'Failure' : 'Failure',
                              body: 'Session Expired',
                              timeout: 3000,
                              showCloseButton: true,
                             bodyOutputType: BodyOutputType.TrustedHtml,
                          };
                          this.alert.warning(toast);
                          this.router.navigate(['/auth/login'])
                      } else {
                          localStorage.setItem('token', JSON.stringify(resp[0]['token']))
                          request = request.clone({
                              setHeaders: {
                                  authorization: resp[0].token
                              }
                          });``
                          window.alert('Session Restored Pls Click Again!')
                          return next.handle(request)
                          
                      }
                  });
              }
              else {
                //   const toast: Toast = {
                //       type: err.error.status == 401 ? 'warning' : 'warning',
                //       title: err.error.status == 401 ? 'Failure' : 'Failure',
                //       body: 'LoggedIn On Another Device',
                //       timeout: 3000,
                //       showCloseButton: true,
                //       bodyOutputType: BodyOutputType.TrustedHtml,
                //   };
                  window.alert('Kindly Logout & Login Once Again')
                  this.router.navigate(['/auth/login'])
              }
          }
          return throwError(error);
   
        }))

        
  }

  
}