import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
// import { MENU_ITEMS } from './pages-menu';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout >
    
  <nb-menu autoCollapse="true" [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  role = [];
  constructor() {
    this.role = JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['umenu']);
    console.log('role item', this.role)
    JSON.parse(JSON.parse(localStorage.getItem('userinfo'))['umenu'])
    this.menu = [
      {
        title: 'Dashboard',
        icon: 'grid-outline',
        link: '/pages/dashboard',
        home: true,
      },
    
    {
      title: 'Geo-Details',
      hidden: !(this.role.find(x => x == 1001) || this.role.find(x => x == 1002)|| this.role.find(x=>x == 1003)
      ||this.role.find(x => x == 1004)|| this.role.find(x => x == 1005)|| this.role.find(x=>x == 1006)||(this.role.find(x => x == 1007) || this.role.find(x => x == 1008)|| this.role.find(x=>x == 1009))),

      icon: 'globe-2-outline',
      children: [
     
        {
          title: 'State',
          hidden: !(this.role.find(x => x == 1001) || this.role.find(x => x == 1002)|| this.role.find(x=>x == 1003)),

          children: [
            {
              title: 'List State',
              hidden: !(this.role.find(x=>x == 1002)),
              link: '/pages/Geo-details/list-state',
             
            },
           
          ],
        },
       

        {
          title: 'District',
          hidden: !(this.role.find(x => x == 1004) || this.role.find(x => x == 1005)|| this.role.find(x=>x == 1005)),

          children: [
            {
              title: 'List District',
              hidden: !(this.role.find(x=>x == 1005)),
              link: '/pages/Geo-details/list-district',
             
            },
           
          ],
        },


        {
          title: 'Hub',
          hidden: !(this.role.find(x => x == 1007) || this.role.find(x => x == 1008)|| this.role.find(x=>x == 1009)),
          children: [
            {
              title: 'List Hub',
              hidden: !(this.role.find(x=>x == 1008)),
              link: '/pages/Geo-details/list-hub',
             
            },
           
          ],
        },


      ],
    },

    {
      title: 'User Details',
      hidden: !(this.role.find(x => x == 2001) || this.role.find(x => x == 2002)|| this.role.find(x=>x == 2003)),
      icon: 'shield-outline',
      children: [
     
        {
          title: 'Add User Details',
          hidden: ! this.role.find(x=> x == 2001),
          link: '/pages/admin/add-user',
         
        },

        {
          title: 'List User Details',
          hidden: ! this.role.find(x=> x == 2002),
          link: '/pages/admin/list-user',
        },

        // {
        //   title: 'User Details',
        //   hidden: ! (this.role.find(x=> x == 2001)|| this.role.find(x=>x==2002) || this.role.find(x=>x==2003)),
        //   children: [
            
        //   ],
        // },

      ],
    },






    {
      title: 'Business',
      hidden: !(this.role.find(x => x == 3001) || this.role.find(x => x == 3002)|| this.role.find(x=>x == 3003)),
      icon: 'pantone-outline',
      children: [
        {
          title: 'Add business',
          hidden: ! this.role.find(x=> x == 3001),
          link: '/pages/business/add-business',
        },
        {
          title: 'List business',
          hidden: ! this.role.find(x=> x == 3002),
          link: '/pages/business/list-business',
        },
       
      ],
    },



    // {
    //   title: 'Business',
    //   icon: 'browser',
    //   children: [
    //     {
    //       title: 'Add business',
    //       link: '/pages/business/add-business',
    //     },
    //     {
    //       title: 'List business',
    //       link: '/pages/business/list-business',
    //     },
       
    //   ],



      {
        title: 'Vendor Details',
          icon: 'person-outline',
        // link: '/pages/layout/stepper',
        hidden: !(this.role.find(x => x == 4001) || this.role.find(x => x == 4002) || this.role.find(x => x == 4003)),

        children: [
        
          {
            title: 'Add Vendor Detail',
            link: '/pages/vendor/AddVendor',
            hidden: !this.role.find(x => x == 4001),
          },
         
  {
            title: 'List Vendor Details',
            link: '/pages/vendor/ListVendor',
            hidden: !this.role.find(x => x == 4002),

          },
        

        ],
        
      },
    // },



      

    


    {
      title: 'Invoice',
      hidden: !(this.role.find(x => x == 5001) || this.role.find(x => x == 5002) || this.role.find(x => x == 5003) || this.role.find(x => x == 5004)|| this.role.find(x => x == 5005)|| this.role.find(x => x == 5006)),

      icon: 'printer-outline',
      children: [
        // {
        //   title: 'Add HSN',
        //   link: '/pages/vendor/Add-hsn',
        // },
        {
          title: 'Add Invoice',
          link: '/pages/vendor/add-invoice',
          hidden: !this.role.find(x => x == 5001),
        },

        {
          title: 'List Invoice',
          link: '/pages/vendor/list-invoice',
          hidden: !this.role.find(x => x == 5002),
        },


        {
          title: 'Serial No',
          hidden: !(this.role.find(x => x == 5004)||this.role.find(x => x == 5005) ),

          children: [

            {
              title: 'Add Serial No',
              link: '/pages/vendor/add-serial',
              hidden: !this.role.find(x => x == 5004),
            },
        
            {
              title: 'List Serial No',
              link: '/pages/vendor/list-serial',
              hidden: !this.role.find(x => x == 5005),
            },
           
          ],
        },
       
      ],
    },



      // {
      //   title: 'FEATURES',
      //   group: true,
      // },
      // {
      //   title: 'Layout',
      //   icon: 'layout',
      //   children: [
      //     {
      //       title: 'Stepper',
      //       link: '/pages/layout/stepper',
      //     },
      //     {
      //       title: 'List',
      //       link: '/pages/layout/list',
      //     },
      //     {
      //       title: 'Infinite List',
      //       link: '/pages/layout/infinite-list',
      //     },
      //     {
      //       title: 'Accordion',
      //       link: '/pages/layout/accordion',
      //     },
      //     {
      //       title: 'Tabs',
      //       pathMatch: 'prefix',
      //       link: '/pages/layout/tabs',
      //     },
      //   ],
      // },
      // {
      //   title: 'Forms',
      //   icon: 'edit-2',
      //   children: [
      //     {
      //       title: 'Form Inputs',
      //       link: '/pages/forms/inputs',
      //     },
      //     {
      //       title: 'Form Layouts',
      //       link: '/pages/forms/layouts',
      //     },
      //     {
      //       title: 'Buttons',
      //       link: '/pages/forms/buttons',
      //     },
      //     {
      //       title: 'Datepicker',
      //       link: '/pages/forms/datepicker',
      //     },
      //   ],
      // },
      // {
      //   title: 'UI Features',
      //   icon: 'keypad',
      //   link: '/pages/ui-features',
      //   children: [
      //     {
      //       title: 'Grid',
      //       link: '/pages/ui-features/grid',
      //     },
      //     {
      //       title: 'Icons',
      //       link: '/pages/ui-features/icons',
      //     },
      //     {
      //       title: 'Typography',
      //       link: '/pages/ui-features/typography',
      //     },
      //     {
      //       title: 'Animated Searches',
      //       link: '/pages/ui-features/search-fields',
      //     },
      //   ],
      // },



      {
        title: 'Material',
        icon: 'cube-outline',
        hidden: !(this.role.find(x => x == 6001) || this.role.find(x => x == 6002) || this.role.find(x => x == 6003) || this.role.find(x => x == 6004)
        || this.role.find(x => x == 6005)|| this.role.find(x => x == 6006)|| this.role.find(x => x == 6007)
        || this.role.find(x => x == 6008)|| this.role.find(x => x == 6009)|| this.role.find(x => x == 6010)
        || this.role.find(x => x == 6011)|| this.role.find(x => x == 6012)),

        children: [
          {
            title: 'Make',
            hidden: !this.role.find(x => x == 6002),
            children: [
              {
                title: 'List Make',
                link: '/pages/vendor/list-make',
                hidden: !this.role.find(x => x == 6002),
              },
             
            ],
          },



          {
            title: 'Device',
            hidden: !this.role.find(x => x == 6005),

            children: [
          
              {
                title: 'List Device',
                link: '/pages/vendor/list-device',
              },
             
            ],
          },


          {
            title: 'Model',
            hidden: !this.role.find(x => x == 6008),

            children: [
          
              {
                title: 'List Model',
                link: '/pages/vendor/list-model',
              },
             
            ],
          },
        

          {
            title: 'HSN',
            hidden: !this.role.find(x => x == 6011),

            children: [
              // {
              //   title: 'Add HSN',
              //   link: '/pages/vendor/Add-hsn',
              // },
              {
                title: 'List HSN',
                link: '/pages/vendor/list-hsn',

              },
             
            ],
          },




         
         

        ],
      },


      
      {
        title: 'Assets Mapping',
     hidden:!  ( this.role.find(x => x == 7001)||this.role.find(x => x == 7002)||this.role.find(x => x == 7003)),
        icon: 'pin-outline',
        children: [

          {
            title: 'Add Assets ',
            link: '/pages/vendor/add-ownuse',
            hidden: !this.role.find(x => x == 7001),
          },
      
          {
            title: 'List Assets ',
            link: '/pages/vendor/list-ownuse',
            hidden: !this.role.find(x => x == 7002),
          },
         
        ],
      },

      // {
      //   title: 'Modal & Overlays',
      //   icon: 'browser',
      //   children: [
      //     {
      //       title: 'Dialog',
      //       link: '/pages/modal-overlays/dialog',
      //     },
      //     {
      //       title: 'Window',
      //       link: '/pages/modal-overlays/window',
      //     },
      //     {
      //       title: 'Popover',
      //       link: '/pages/modal-overlays/popover',
      //     },
      //     {
      //       title: 'Toastr',
      //       link: '/pages/modal-overlays/toastr',
      //     },
      //     {
      //       title: 'Tooltip',
      //       link: '/pages/modal-overlays/tooltip',
      //     },
      //   ],
      // },


      // {
      //   title: 'User',
      //   icon: 'browser',
      //   children: [
      //     {
      //       title: 'Add user',
      //       link: '/pages/user/add-user',
      //     },
      //     {
      //       title: 'List user',
      //       link: '/pages/user/list-user',
      //     },
         
      //   ],
      // },

      

     






    //   {
    //     title: 'Extra Components',
    //     icon: 'message-circle',
    //     children: [
    //       {
    //         title: 'Calendar',
    //         link: '/pages/extra-components/calendar',
    //       },
    //       {
    //         title: 'Progress Bar',
    //         link: '/pages/extra-components/progress-bar',
    //       },
    //       {
    //         title: 'Spinner',
    //         link: '/pages/extra-components/spinner',
    //       },
    //       {
    //         title: 'Alert',
    //         link: '/pages/extra-components/alert',
    //       },
    //       {
    //         title: 'Calendar Kit',
    //         link: '/pages/extra-components/calendar-kit',
    //       },
    //       {
    //         title: 'Chat',
    //         link: '/pages/extra-components/chat',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Maps',
    //     icon: 'map',
    //     children: [
    //       {
    //         title: 'Google Maps',
    //         link: '/pages/maps/gmaps',
    //       },
    //       {
    //         title: 'Leaflet Maps',
    //         link: '/pages/maps/leaflet',
    //       },
    //       {
    //         title: 'Bubble Maps',
    //         link: '/pages/maps/bubble',
    //       },
    //       {
    //         title: 'Search Maps',
    //         link: '/pages/maps/searchmap',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Charts',
    //     icon: 'pie-chart',
    //     children: [
    //       {
    //         title: 'Echarts',
    //         link: '/pages/charts/echarts',
    //       },
    //       {
    //         title: 'Charts.js',
    //         link: '/pages/charts/chartjs',

    //       },
    //       {
    //         title: 'D3',
    //         link: '/pages/charts/d3',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Editors',
    //     icon: 'text',
    //     children: [
    //       {
    //         title: 'TinyMCE',
    //         link: '/pages/editors/tinymce',
    //       },
    //       {
    //         title: 'CKEditor',
    //         link: '/pages/editors/ckeditor',
    //       },


    //     ],
    //   },
      // {
      //   title: 'Tables & Data',
      //   icon: 'grid',
      //   children: [
      //     {
      //       title: 'Smart Table',
      //       link: '/pages/tables/smart-table',
      //     },
      //     {
      //       title: 'Tree Grid',
      //       link: '/pages/tables/tree-grid',
      //     },
      //   ],
      // },
      // {
      //   title: 'Miscellaneous',
      //   icon: 'shuffle-2',
      //   children: [
      //     {
      //       title: '404',
      //       link: '/pages/miscellaneous/404',
      //     },
      //   ],
      // },




    


    //   {
    //     title: 'login',
    //     icon: 'shuffle-2',
    //     children: [
    //       {
    //         title: 'login',
    //         link: '/pages/login/loginc'
    //       },
    //     ]
    //   },
      // {
      //   title: 'Auth',
      //   icon: 'lock',
      //   children: [
      //     {
      //       title: 'Login',
      //       link: '/auth/login',
      //     },
      //     {
      //       title: 'Register',
      //       link: '/auth/register',
      //     },
      //     {
      //       title: 'Request Password',
      //       link: '/auth/request-password',
      //     },
      //     {
      //       title: 'Reset Password',
      //       link: '/auth/reset-password',
      //     },
      //   ],
      // },

    ];

  }

  menu: NbMenuItem[];
}