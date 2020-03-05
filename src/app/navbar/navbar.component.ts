import { Component, OnInit, HostListener } from '@angular/core';
import { IMenu } from 'src/IMenu';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ConstantsService } from '../constants.service';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  Consts: ConstantsService;
  Menu: IMenu[] = [
    {
      href: '/',
      name: 'Home',
      title: 'Go Home'
    },
    {
      href: '/',
      name: 'Browse',
      title: 'Browse places!'
    },
    {
      href: '#',
      name: 'Change Theme',
      title: 'Change page color scheme',
      dropdown: []
    },
    {
      href: '#',
      name: 'User',
      title: 'User Area',
      icon: faUser
    }
  ];
  changeTheme(e, i) {
    e.preventDefault();
    for (let j = 0; j < this.consts.themeColors[i].colors.length; j++) {
      document.documentElement.style.setProperty('--color' + j, this.consts.themeColors[i].colors[j]);
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(e) {
    let isDropdownMenu = false;
    let isDropdownContent = false;
    let isBurger = false;
    e.path.forEach(element => {
      if (typeof element.classList !== 'undefined') {
        element.classList.forEach(Class => {
          if (Class === 'dropdown')  { isDropdownMenu = true; }
          if (Class === 'dropdown-content') { isDropdownContent = true; }
          if (Class === 'burger') { isBurger = true; }
        });
      }
    });
    if (!isDropdownMenu || isDropdownContent) {
      document.querySelector('.dropdown-content').classList.remove('open');
    }
    if (!isBurger && !isDropdownMenu && !isDropdownContent) { document.querySelector('.menu-links').classList.remove('active'); }
  }

  toggleDropdown(e) {
    e.preventDefault();
    e.target.nextSibling.classList.toggle('open');
  }
  toggleMenu() {
    const elBurger = document.querySelector('.burger');
    const elLinks = document.querySelector('.menu-links');
    elBurger.classList.toggle('active');
    elLinks.classList.toggle('active');
  }

  constructor(private consts: ConstantsService) {
    let i = 0;
    this.Consts = consts;
    consts.themeColors.forEach(element => {
      this.Menu[2].dropdown.push({ name: element.name, id: i });
      i++;
    });
  }

  ngOnInit(): void {}

}
