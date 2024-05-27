import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {NbAuthComponent,NbLogoutComponent,} from '@nebular/auth';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    
    children: [
      {
        path: 'login',
        component: LoginComponent,
    
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
    ],
  },




  

  { path: '', redirectTo: 'pages', pathMatch: 'full' },//auth/login
  { path: '**', redirectTo: 'pages' },

  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};



@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
