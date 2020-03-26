import { Component, OnInit, Output } from '@angular/core';
import { ILanguage } from 'src/app/ILanguage';
import { Subscription } from 'rxjs';
import { TranslationService } from './translation.service';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  Language: ILanguage;
  LangSubscription: Subscription;
  Loading = true;

  scroll = (event): void => {
    const nav = document.querySelector('.go-up').classList;
    if (window.pageYOffset > 100) {
      nav.add('block');
      nav.remove('hidden');
    } else {
      nav.remove('block');
      nav.add('hidden');

    }
  }
  scrollTop() {
    document.getElementsByTagName('body')[0].scrollIntoView({behavior: 'smooth'});
  }

    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
        this.Loading = true;
      }
      if (event instanceof NavigationEnd) {
        this.Loading = false;
      }
  
      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
        this.Loading = false;
      }
      if (event instanceof NavigationError) {
        this.Loading = false;
      }
    }

  constructor(private langService: TranslationService, private router: Router) {
    this.Language = langService[langService.language];
    this.LangSubscription = langService.languageChange.subscribe((value) => {
        this.Language = value;
    });
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }
  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }
}
