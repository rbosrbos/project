import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslationService } from '../translation.service';
import { ILanguage } from '../../ILanguage';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})


export class MainpageComponent implements OnInit {
  Language: ILanguage;
  LangSubscription: Subscription;
  Title: Subject<string> = new Subject<string>();


  showBG() {
    const x = document.querySelectorAll('div');
    x.forEach(element => {
      element.style.opacity = '0';
    });
    setTimeout(function(){x.forEach(element => {console.log(element.style.zIndex);
      element.style.opacity = '1';
    });},2000)
  }


  constructor(private TitleService: Title, private langService: TranslationService) {
    this.Language = langService[langService.language];
    this.Title.subscribe((data)=>{
      TitleService.setTitle(langService.pageTitle + ' - ' + data);
    });
    this.Title.next(this.Language.home);
    this.LangSubscription = langService.languageChange.subscribe((value) => {
        this.Language = value;
        this.Title.next(value.home);
    });
  }
  ngOnInit(): void {}

}
