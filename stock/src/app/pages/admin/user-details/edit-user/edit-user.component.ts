import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ITreeOptions } from "angular-tree-component";
import { toJS } from "mobx";
import { ToastrService } from "ngx-toastr";
import { MenuroleService } from "../../../_services/menurole.service";
import { NbToastrService } from "@nebular/theme";
import { BusinessService } from "../../../_services/business.service";
import { UserService } from "../../../_services/user.service";
import { RoleservicesService } from "../../../_services/roleservices.service";

@Component({
  selector: "ngx-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent {
  @ViewChild("tree") public tree;
  AddProfileForm;
  edit;
  editrolel;
  editdata;
  submit: boolean;

   
  nodes = [
    {
      name: "Geo-Details",
      children: [
        {
          name: "State",
          children: [
            { id: 1001, name: "Add State" },
            { id: 1002, name: "List State" },
            { id: 1003, name: "Edit State" },
          ],
        },
        {
          name: "District",
          children: [
            { id: 1004, name: "Add District" },
            { id: 1005, name: "List District" },
            { id: 1006, name: "Edit District" },
          ],
        },
      ],
    },
    {
      name: "Admin Details",
      children: [
  
            { id: 2001, name: "List Admin" },
            { id: 2002, name: "Edit Admin" },
    
      ],
    },

      {
          name: 'User Details',
          children: [
           {id :2003 , name : "Add User"},
          { id: 2004, name:" List User "},
          {id :2005 , name :"edit User"},
          ]
        },

    {
      name: "Business",
      children: [
        { id: 3001, name: "Add Business" },
        { id: 3002, name: "List Business " },
        { id: 3003, name: "Edit Business " },
      ],
    },

    {
      name: "Vendor Details",
      children: [
        { id: 4001, name: "Add Vendor" },
        { id: 4002, name: "List Vendor " },
        { id: 4003, name: "Edit Vendor " },
      ],
    },

    {
      name: "Department Details",
      children: [
        { id: 4011, name: "Add Vendor" },
        { id: 4012, name: "List Vendor " },
        { id: 4013, name: "Edit Vendor " },
      ],
    },

    {
      name: "Material",
      children: [
        {
          name: "Make",
          children: [
            { id: 6001, name: "Add Make" },
            { id: 6002, name: "List Make" },
            { id: 6003, name: "Edit Make" },
          ],
        },
        {
          name: "Device",
          children: [
            { id: 6004, name: "Add Device" },
            { id: 6005, name: "List Device" },
            { id: 6006, name: "Edit Device" },
          ],
        },

        {
          name: "Model",
          children: [
            { id: 6007, name: "Add Model" },
            { id: 6008, name: "List Model" },
            { id: 6009, name: "Edit Model" },
          ],
        },

        {
          name: "HSN",
          children: [
            { id: 6010, name: "Add HSN" },
            { id: 6011, name: "List HSN" },
            { id: 6012, name: "Edit HSN" },
          ],
        },
      ],
    },

    {
      name: "Invoice",
      children: [
        { id: 5001, name: "Add Invoice" },
        { id: 5002, name: "List Invoice" },
        { id: 5003, name: "Edit Invoice" },

        {
          name: "Serial No",
          children: [
            { id: 5004, name: "Add Serial No" },
            { id: 5005, name: "List Serial No" },
            { id: 5006, name: "Edit Serial No" },
          ],
        },
      ],
    },

   

    {
      name: "HUB",
      children: [
        { id: 6001, name: "Add HUB" },
        { id: 6002, name: "List HUB" },
        { id: 6003, name: "Edit HUB" },
      ],
    },

    {
      name: "Assest Mapping",
      children: [
        { id: 7001, name: "Add Assest" },
        { id: 7002, name: "List Assest" },
        { id: 7003, name: "Edit Assest" },
      ],
    },
  ];





  options: ITreeOptions = {
    useCheckbox: true,
  };

  constructor(
    private toast: NbToastrService,
    private router: Router,
    private bussiness: BusinessService,
    private userservi: UserService,
    public role: RoleservicesService,
    public menurole: MenuroleService
  ) {
    this.edit = JSON.parse(localStorage.getItem("profile_e"));
  }
  async ngOnInit() {
    //  this.id = this.aRoute.snapshot.queryParams.id;
    //console.log("id********",this.id)
    await this.createForm();

    if (this.role.getroleid() > 888) {
      await this.getBusiness();
    } else {
      this.AddProfileForm.get("bid").setValue(this.role.getbusiness());
    }

    await this.editRole();
    await this.editRole1();
    await this.createForm();
    await this.getBusiness();
  }

  getbusinessd;
  getbuss;

  async getBusiness() {
    this.getbusinessd = await this.bussiness.getbusiness({});
    this.getbuss = this.getbusinessd[0];
    // console.log("get business ", this.getbuss);
  }

  async editRole() {
    this.editrolel = await this.userservi.getuser({ id: this.edit["id"] });

    this.editdata = this.editrolel[0];

    console.log("data to.......@@@@@@@@@@@@@@...", this.editdata);

    if (this.editrolel[0]["umenu"] != null)
      this.selectnodes(this.editrolel[0]["umenu"]);

    //  this.selectnodes(this.editrolel[0]['umenu']) ;
    //  console.log("nodessss////////",this.editrolel[0]['menu'])
    // }
  }

  editumenu;
  async editRole1() {
    this.editrolel = await this.menurole.getumenu({});
    this.editumenu = this.editrolel[0];
    console.log("data to..........", this.editrolel[0]);
  }

  async AddProfile() {
    console.log("am here dfdf");
    if (this.AddProfileForm.invalid) {
      this.submit = true;
      return;
    }
    var val = this.AddProfileForm.value;
    if (this.edit) {
      val["id"] = this.edit["id"];
      // val["rolename"] = this.edit["rolename"];
      this.AddProfileForm.value["menurole"] = this.selectednodes();
      let result = await this.userservi.edituser(this.AddProfileForm.value);
      if (result && result[0].err_code == 0) {
        this.toast.success(" ", result[0]["msg"]);
        this.router.navigate(["/pages/admin/list-user"]);
      } else {
        this.toast.warning(" ", result[0]["msg"]);
        console.log("add...", this.AddProfileForm.value);
      }
    }
  }
  selectednodes() {
    const selectedNodes = [];
    Object.entries(toJS(this.tree.treeModel.selectedLeafNodeIds)).forEach(
      ([key, value]) => {
        if (value === true) {
          selectedNodes.push(parseInt(key));
        }
      }
    );
    return selectedNodes;
  }
  selectnodes(item) {
    console.log("itemselectnod****************", item);
    let data = JSON.parse(item);
    let index: number = data.indexOf(404);
    if (index !== -1) {
      data.splice(index, 1);
    }
    for (var i = 0; i < data.length; ++i) {
      let leaf = this.tree.treeModel.getNodeById(JSON.parse(data[i]));
      if (leaf) leaf.setIsSelected(true);
    }
  }

  createForm() {
    this.AddProfileForm = new FormGroup({
      bid: new FormControl(this.editdata?.["bid"] || "", Validators.required),
      urole: new FormControl(
        this.editdata?.["urole"] || "",
        Validators.required
      ),
      loginid: new FormControl(
        this.editdata?.["loginid"] || "",
        Validators.required
      ),
      pwd: new FormControl(""),
      fname: new FormControl(
        this.editdata?.["fname"] || "",
        Validators.required
      ),
      mobile: new FormControl(
        this.editdata?.["mobile"] || "",
        Validators.required
      ),
      email: new FormControl(
        this.editdata?.["email"] || "",
        Validators.required
      ),
      address: new FormControl(
        this.editdata?.["address"] || "",
        Validators.required
      ),
    });
  }
}
