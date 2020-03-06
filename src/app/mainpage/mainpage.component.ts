import { Component, OnInit, Input } from '@angular/core';
import { TitleService } from '../title.service';
import { TranslationService } from '../translation.service';
import { ILanguage } from '../../ILanguage';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  Language: ILanguage;

  constructor(private title: TitleService, private langService: TranslationService) {
    this.Language = langService[langService.Actual];
    title.setTitle(langService.pageTitle + ' - ' + langService.EN.mainpageTitle);
  }

  ngOnInit(): void {
  }

}
