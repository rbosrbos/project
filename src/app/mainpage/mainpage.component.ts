import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslationService } from '../translation.service';
import { ILanguage } from '../ILanguage';
import { Subscription, Subject } from 'rxjs';
import { ICard } from '../ICard';
import { ModalService } from '../modal.service';
import exampleData from '../browse/example.json';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})


export class MainpageComponent implements OnInit {
  Language: ILanguage;
  LangSubscription: Subscription;
  Title: Subject<string> = new Subject<string>();
  Cards: ICard[] = exampleData;
  Slides: string[];
  lat: number;
  lon: number;
  zoom = 15;
  headerImg = 'assets/images/header-image.webp';

  showBG() {
    const x = document.querySelectorAll('div');
    x.forEach(element => {
      element.style.opacity = '0';
    });
    setTimeout(() => {
      x.forEach(element => {
      element.style.opacity = '1';
    }); } , 2000);
  }

// ============================================ MODAL
openModal(i: number) {
  if (this.Cards[i].slides.length > 1) {
    this.Slides = this.Cards[i].slides;
    this.Slides.forEach(element => {
      new Image().src = element;
    });
  } else {
    this.Slides = [];
    this.Slides[0] = this.Cards[i].slides[0];
  }
  this.lat = this.Cards[i].coordinates.lat;
  this.lon = this.Cards[i].coordinates.lon;
  this.Modal.open(i);
}
closeModal() {
  this.Modal.close();
}
  constructor(private TitleService: Title, private langService: TranslationService, private Modal: ModalService) {
    this.Language = langService[langService.language];
    this.Title.subscribe((data) => {
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
