import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/app/ILanguage';
import { TranslationService } from '../translation.service';
import { Title } from '@angular/platform-browser';
import { Subscription, Subject } from 'rxjs';
import { ICard } from '../ICard';
import { ModalService } from '../modal.service';
import exampleData from './example.json';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  Language: ILanguage;
  LangSubscription: Subscription;
  Title: Subject<string> = new Subject<string>();
  SelectedCat: number;
  SelectedReg: number;
  Slides: string[];
  lat: number;
  lon: number;
  zoom = 15;

  Cards: ICard[] = exampleData;
  CardsFiltered: ICard[] = this.Cards;
  filterCards(c: number, r: number) {
    this.CardsFiltered = [];
    for (const val of Object.keys(this.Cards)) {
      const e = this.Cards[val];
      if (((e.type === +c) || (+c === 0)) && ((e.region === +r) || (+r === 0))) {
        this.CardsFiltered.push(e);
      }
    }
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
    this.Title.next(this.Language.browse.name);
    this.LangSubscription = langService.languageChange.subscribe((value) => {
        this.Language = value;
        this.Title.next(value.browse.name);
    });
    this.SelectedCat = 0;
    this.SelectedReg = 0;
  }

  ngOnInit(): void {}

}
