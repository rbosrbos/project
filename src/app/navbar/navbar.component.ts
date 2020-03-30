import { Component, OnInit, HostListener, Input } from '@angular/core';
import { IMenu } from 'src/app/IMenu';
import { Subscription } from 'rxjs';
import { ILanguage } from 'src/app/ILanguage';
import { ConstantsService } from '../constants.service';
import { TranslationService } from '../translation.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  Consts: ConstantsService;
  @Input() Language: ILanguage;
  subscription: Subscription;

  Menu: IMenu[];
  changeTheme(e, i) {
    e.preventDefault();
    const themeMeta = document.querySelector('meta[name=theme-color]');
    themeMeta.setAttribute('content', this.consts.themeColors[i].colors[3]);
    for (let j = 0; j < this.consts.themeColors[i].colors.length; j++) {
      document.documentElement.style.setProperty('--color' + j, this.consts.themeColors[i].colors[j]);
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(e) {
    const elNav = document.querySelector('nav');
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
    if (!isBurger && !isDropdownMenu && !isDropdownContent) {
      document.querySelector('.menu-links').classList.remove('active');
      elNav.style.overflow = '';
    }
  }

  toggleDropdown(e) {
    e.preventDefault();
    e.target.nextSibling.classList.toggle('open');
  }
  toggleMenu() {
    const elBurger = document.querySelector('.burger');
    const elLinks = document.querySelector('.menu-links');
    const elNav = document.querySelector('nav');
    elBurger.classList.toggle('active');
    elLinks.classList.toggle('active');
    if (elNav.style.overflow === 'visible') {
      elNav.style.overflow = '';
    } else { elNav.style.overflow = 'visible'; }
  }

  changeLang(lang, e) {
    e.preventDefault();
    this.langService.changeLang(lang);
  }

  makeMenu(e?: ILanguage) {
    let l = this.Language;
    if (e !== undefined) {
      l = e;
    }
    this.Menu = [
      {
        href: '/',
        name: l.home
      },
      {
        href: '/browse',
        name: l.browse.name
      },
      {
        href: '/forecast',
        name: l.weatherforecastTitle
      },
      {
        href: '#',
        name: 'Change Theme',
        dropdown: []
      },
      {
        href: '/contact',
        name: l.contact
      }
    ];
    let i = 0;
    this.Consts.themeColors.forEach(element => {
      this.Menu[3].dropdown.push({ name: this.Language.changeThemeOptions[i], id: i });
      i++;
    });
  }
  scroll = (event): void => {
    document.querySelector('nav').style.overflow = '';
    document.querySelector('.menu-links').classList.remove('active');
    if (window.pageYOffset > 45) {
      document.querySelector('nav').classList.add('opaque');
    } else {
      document.querySelector('nav').classList.remove('opaque');
    }
  }
  constructor(private consts: ConstantsService, private langService: TranslationService, private title: TitleService) {
    this.Consts = consts;
    this.subscription = langService.languageChange.subscribe((value) => {
        this.makeMenu(value);
    });
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
    this.makeMenu();
  }

}
