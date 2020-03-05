import { Component, OnInit, HostListener } from "@angular/core";
import { IMenu } from "src/IMenu";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ConstantsService } from "../constants.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  _themeColors = [];
  _consts:ConstantsService;
  _menu: IMenu[] = [
    {
      href: "/",
      name: "Home",
      title: "Go Home"
    },
    {
      href: "/",
      name: "Browse",
      title: "Browse places!"
    },
    {
      href: "#",
      name: "Change Theme",
      title: "Change page color scheme",
      dropdown: []
    },
    {
      href: "#",
      name: "User",
      title: "User Area",
      icon: faUser
    }
  ];
  changeTheme(e,i) {
    e.preventDefault();
    
    for (let j = 0;j<this._consts.themeColors[i].colors.length;j++) {
      document.documentElement.style.setProperty("--color"+j, this._consts.themeColors[i].colors[j]);
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(e) {
    let isDropdownMenu = false;
    let isDropdownContent = false;
    e.path.forEach(element => {
      if (typeof element.classList !== 'undefined') {
        element.classList.forEach(_class => {
          if (_class == 'dropdown') isDropdownMenu = true;
          if (_class == 'dropdown-content') isDropdownContent = true;
       }); 
      }
    });
    if ((!isDropdownMenu) || (isDropdownContent)) {
      document.querySelector(".dropdown-content").classList.remove("open");
      //document.querySelector(".dropdown-content").classList.add("closed");
    }
    
  }

  toggleDropdown(e) {
    e.preventDefault();
    if (e.target.nextSibling.classList.contains("open")) e.target.nextSibling.classList.toggle("closed");
    else if (e.target.nextSibling.classList.contains("closed")) e.target.nextSibling.classList.remove("closed");
    e.target.nextSibling.classList.toggle("open");
  }
  toggleMenu() {
    const elBurger = document.querySelector(".burger");
    const elLinks = document.querySelector(".menu-links");
    elBurger.classList.toggle("active");
    elLinks.classList.toggle("active");
  }

  constructor(private consts: ConstantsService) {
    let i = 0;
    this._consts = consts;
    consts.themeColors.forEach(element => {
      this._menu[2].dropdown.push({"name":element.name, "id":i});
      i++;
    });
  }

  ngOnInit(): void {}

}
