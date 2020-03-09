import { Component, OnInit } from '@angular/core';
import { TranslationService } from './translation.service';
import { ILanguage } from '../ILanguage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  Language: ILanguage;

  scroll = (event): void => {
    const elParalaxes = document.getElementsByClassName('parallax') as HTMLCollectionOf<HTMLElement>;
    for (const i in elParalaxes) {
      if (elParalaxes.hasOwnProperty(i)) {
        elParalaxes[i].style.transform = 'translate(0, ' + (window.pageYOffset / 1.2) + 'px)';
        if (typeof i !== 'number') {
          break;
        }
      }
    }
  }
  constructor(private langService: TranslationService) {
    this.Language = langService[langService.Actual];
  }
  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }
}
