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
    this.Language = langService[langService.Actual];
    console.log(this.Language);
    title.setTitle(langService.pageTitle + ' - ' + langService.EN.mainpageTitle);
  }

  ngOnInit(): void {
  }

}
