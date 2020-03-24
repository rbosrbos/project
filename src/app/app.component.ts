import { Component, OnInit, Output } from '@angular/core';
import { ILanguage } from 'src/app/ILanguage';
import { Subscription } from 'rxjs';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  Language: ILanguage;
  LangSubscription: Subscription;

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
  constructor(private langService: TranslationService) {
    this.Language = langService[langService.language];
    this.LangSubscription = langService.languageChange.subscribe((value) => {
        this.Language = value;
    });
  }
  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }
}
