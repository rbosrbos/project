import { Component } from '@angular/core';
import { TranslationService } from './translation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LusoNature';
  Langs: TranslationService;
  constructor(private langs: TranslationService) {
    this.Langs = langs;
    console.log(this.langs);
  }
}
