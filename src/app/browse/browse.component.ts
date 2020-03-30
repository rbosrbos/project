import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/app/ILanguage';
import { TranslationService } from '../translation.service';
import { Title } from '@angular/platform-browser';
import { Subscription, Subject } from 'rxjs';
import { ICard } from '../ICard';
import { ModalService } from '../modal.service';
import { ActivatedRoute } from '@angular/router';
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
    this.resize();
  }

  // ============================================ MODAL
  openModal(i: number) {
    if (this.CardsFiltered[i].slides.length > 1) {
      this.Slides = this.CardsFiltered[i].slides;
      this.Slides.forEach(element => {
        new Image().src = element;
      });
    } else {
      this.Slides = [];
      this.Slides[0] = this.CardsFiltered[i].slides[0];
    }
    this.lat = this.CardsFiltered[i].coordinates.lat;
    this.lon = this.CardsFiltered[i].coordinates.lon;
    this.Modal.open(i);
    const mapContainer = document.getElementById('map');
    const map = document.getElementsByTagName('agm-map')[i] as HTMLElement;
    map.style.height = '100%';
  }
  closeModal() {
    this.Modal.close();
  }
  constructor(
    private TitleService: Title,
    private langService: TranslationService,
    private Modal: ModalService,
    private route: ActivatedRoute
    ) {
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
  resize = (): void => {
    const masonry = document.getElementById('masonry');
    if (this.CardsFiltered.length < 4) {
      masonry.classList.add('masonry-flex');
    } else {
      if (masonry.classList.contains('masonry-flex')) {
        masonry.classList.remove('masonry-flex');
      }
    }
  }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        const type = params.type ? params.type : 0;
        const region = params.region ? params.region : 0;
        this.SelectedCat = type;
        this.SelectedReg = region;
        this.filterCards(type, region);
      });
  }

}
