import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslationService } from '../translation.service';
import { ILanguage } from '../ILanguage';
import { Subscription, Subject } from 'rxjs';
import { ICard } from '../ICard';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})


export class MainpageComponent implements OnInit {
  Language: ILanguage;
  LangSubscription: Subscription;
  Title: Subject<string> = new Subject<string>();
  Cards: ICard[]
  = [
      {
        title: 'Parque Eduardo VII',
        img: 'https://handluggageonly.co.uk/wp-content/uploads/2017/02/Parque-Eduardo-VII.jpg',
        description: 'The central park in Lisbon is known for its rolling hills and undulating lawns. As you wander around here, ' +
        'look back over the downtown area of the city for views that stretch as far as the river.',
        type: 3,
        region: 2,
        coordinates: {
          lat: 38.728467,
          lon: -9.152565
        }
      },
      {
        title: 'Ponta da Piedade',
        img: 'https://i1.wp.com/gringajourneys.com/wp-content/uploads/2017/06/6137529974_970cefe89e_o.jpg?ssl=1',
        description: 'Although Ponta da Piedade is typically filled with tourists, I still recommend checking it out. I regret that' +
        ' I didn’t spend more time there! I knew I wanted to make a boat trip during my time in the Algarve but ended up doing this ' +
        'at Benagil beach to see the famous Benagil Cave (side note: it was a little expensive but worth snapping a photo here). In my ' +
        'opinion, if you’re hoping to see grottos and save a little cash, considering going on one of the boat tours here at Ponta da ' +
        'Piedade. This location offers activities such as hiking, kayaking, and stand up paddleboarding.',
        type: 1,
        region: 2,
        coordinates: {
          lat: 37.079635,
          lon: -8.668610
        }
      },
      {
        title: 'Ponta da Piedade',
        img: 'https://i1.wp.com/gringajourneys.com/wp-content/uploads/2017/06/6137529974_970cefe89e_o.jpg?ssl=1',
        description: 'Although Ponta da Piedade is typically filled with tourists, I still recommend checking it out. I regret that' +
        ' I didn’t spend more time there! I knew I wanted to make a boat trip during my time in the Algarve but ended up doing this ' +
        'at Benagil beach to see the famous Benagil Cave (side note: it was a little expensive but worth snapping a photo here). In my ' +
        'opinion, if you’re hoping to see grottos and save a little cash, considering going on one of the boat tours here at Ponta da ' +
        'Piedade. This location offers activities such as hiking, kayaking, and stand up paddleboarding.',
        type: 1,
        region: 2,
        coordinates: {
          lat: 37.079635,
          lon: -8.668610
        }
      }
  ];

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


  constructor(private TitleService: Title, private langService: TranslationService) {
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
