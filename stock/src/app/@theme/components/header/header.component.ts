import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";
import { LayoutService } from "../../../@core/utils";
import { Subject, from } from "rxjs";
import { ChangepasswordComponent } from "../changepassword/changepassword.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RoleservicesService } from "../../../pages/_services/roleservices.service";
import { MenuroleService } from "../../../pages/_services/menurole.service";
import { Router } from "@angular/router";
@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  // @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any = { name: this.role.getuserFname() };

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";

  userMenu = [
    { title: "Change Password", data: { id: "Change Password" } },
    { title: "Log out", link: "auth/login" },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private modal: NgbModal,
    private role: RoleservicesService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuService.onItemClick().subscribe((event) => {
      console.log("", event.item.title);
      if (event.item.title === "Change Password") {
        const modalRef = this.modal.open(ChangepasswordComponent, {
          size: "md",
          container: "nb-layout",
          backdrop: false,
        });
        modalRef.componentInstance.title = "Change Password";
      }

      if (event.item.title == "log out") {
        localStorage.removeItem("token");
        localStorage.removeItem("userinfo");
        this.router.navigate(["/auth/login"]);
      }
    });
  }

  ngOnDestroy() {
    // this.menuService.unsc
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }
  // search() {
  //   const modalRef = this.modal.open(SearchpopComponent, { container: 'nb-layout', backdrop: false });
  //   modalRef.componentInstance.title = 'Search';
  //   modalRef.result.then((data) => {

  //   })
  // };
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
