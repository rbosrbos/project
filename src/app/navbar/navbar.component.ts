import { Component, OnInit, HostListener } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IMenu } from 'src/IMenu';
import { ILanguage } from 'src/ILanguage';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
  LangContent: TranslationService;
  Language: ILanguage;
  Title: TitleService;
  Menu: IMenu[];
  changeTheme(e, i) {
    e.preventDefault();
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

  changeLang(lang) {
    // this.Language = this.LangContent[lang];
    this.LangContent.changeLang(lang);
    const actual = this.LangContent.Actual;
    console.log(actual);
    this.Language = this.LangContent[actual];
    this.makeMenu();
  }

  makeMenu() {
    this.Menu = [
      {
        href: '/',
        name: this.Language.home
      },
      {
        href: '/',
        name: this.Language.browse
      },
      {
        href: '#',
        name: 'Change Theme',
        dropdown: []
      },
      {
        href: '#',
        name: 'User',
        icon: faUser
      }
    ];
    let i = 0;
    this.Consts.themeColors.forEach(element => {
      this.Menu[2].dropdown.push({ name: this.Language.changeThemeOptions[i], id: i });
      i++;
    });
  }
  scroll = (event): void => {
    if (window.pageYOffset > 45) {
      document.querySelector('nav').classList.add('opaque');
    } else {
      document.querySelector('nav').classList.remove('opaque');
    }
  }
  constructor(private consts: ConstantsService, private langContent: TranslationService, private title: TitleService) {
    this.Consts = consts;
    this.LangContent = langContent;
    // this.LangContent.changeLang('EN');
    this.Language = this.LangContent.EN;
    this.makeMenu();
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

}
