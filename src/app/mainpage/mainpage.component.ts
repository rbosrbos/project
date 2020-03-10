import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { TranslationService } from '../translation.service';
import { ILanguage } from '../../ILanguage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})


export class MainpageComponent implements OnInit {
  Language: ILanguage;
  subscription: Subscription;
  showBG() {
    const x = document.querySelectorAll('div');
    x.forEach(element => {console.log(element.style.zIndex);
      element.style.opacity = '0';
    });
    setTimeout(function(){x.forEach(element => {console.log(element.style.zIndex);
      element.style.opacity = '1';
    });},2000)
  }
  constructor(private title: TitleService, private langService: TranslationService) {
    title.setTitle(langService.pageTitle + ' - ' + langService.EN.mainpageTitle);

    this.Language = langService[langService.language];
        this.subscription = langService.languageChange.subscribe((value) => {
            this.Language = value;
        })
  }
  ngOnInit(): void {}

}
