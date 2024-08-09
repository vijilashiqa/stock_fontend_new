import { Component, OnInit } from '@angular/core';
import{ PagerService} from '../../_services/pager.service';
import { RoleservicesService } from '../../_services/roleservices.service';
import { BusinessService } from '../../_services/business.service';

@Component({
  selector: 'ngx-list-bussiness',
  templateUrl: './list-bussiness.component.html',
  styleUrls: ['./list-bussiness.component.scss']
})
export class ListBussinessComponent {
  pager: any = {}; page: number = 1; pagedItems: any = []; limit = 25;businesslist;data;count;loading=false;search;busid;
    getbusinessd;getbuss;mobile = '';getmobilel;getmob;email=''
  constructor(
    private pageservice :PagerService,
    private business :BusinessService,
    public role: RoleservicesService,
    private Business :BusinessService
  ) { }

 async ngOnInit() {
  await this.initiallist();
  if(this.role.getroleid() > 888){
    await this.getBusiness()
    }
else{
  this.busid = this.role.getbusiness();
  console.log("after the ",this.busid);
  await this.getmobile();
  await this.getmail()
}

  }


  changebusiness(){
   this.mobile='';
   this.email='';
  }


  changemobile(){
    this.email='';
  }

  async getBusiness(event ='') {
    this.getbusinessd = await this.Business.getbusiness({like :event});
    this.getbuss = this.getbusinessd[0];
    // console.log("get business ", this.getbuss);
  }

  

  async getmobile(event ='') {
    this.getmobilel = await this.Business.getmobile({like :event,id: this.busid});
    this.getmob = this.getmobilel[0];
    console.log("get mobile ", this.getmob);
  }
  getemail;getmaill

  async getmail(event ='') {
    this.getemail = await this.Business.getmail({like :event ,id: this.busid });
    this.getmaill = this.getemail[0];
    console.log("get mobile ", this.getmaill);
  }



  async initiallist() {
    this.loading=true;
    this.businesslist = await this.business.listbusiness({index:(this.page - 1) * this.limit, limit:this.limit , mobile: this.mobile ,busid : this.busid ,mail:this.email });
    // console.log('area=====', this.businesslist)
    this.data = this.businesslist[0];
    this.count = this.businesslist[1].count;
    this.loading=false;
    this.setPage();
  }

  
  getlist(page) {
    var total = Math.ceil(this.count / this.limit);
    let result = this.pageservice.pageValidator(this.page, page, total);
    this.page = result['value'];
    if (result['result']) {
      this.initiallist();
    };
  }

  setPage() {
    this.pager = this.pageservice.getPager(this.count, this.page, this.limit);
    this.pagedItems = this.data;
  }
  
}