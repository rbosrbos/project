import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/app/ILanguage';
import { TranslationService } from '../translation.service';
import { Title } from '@angular/platform-browser';
import { Subscription, Subject } from 'rxjs';
import { ICard } from '../ICard';


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
  Cards: ICard[]
  = [
      {
        title: 'Parque Eduardo VII',
        img: 'https://handluggageonly.co.uk/wp-content/uploads/2017/02/Parque-Eduardo-VII.jpg',
        description: 'The central park in Lisbon is known for its rolling hills and undulating lawns. As you wander around here, ' +
        'look back over the downtown area of the city for views that stretch as far as the river.',
        type: 3,
        region: 2
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
        region: 3
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
        region: 3
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
        region: 3
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
        region: 3
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
        region: 3
      }
    ];
    CardsFiltered: ICard[] = this.Cards;
    filterCards(c: number, r: number) {
      this.CardsFiltered = [];
      for (const val of Object.keys(this.Cards)) {
        const e = this.Cards[val];
        if (((e.type === +c) || (+c === 0)) && ((e.region === +r) || (+r === 0))) {
          this.CardsFiltered.push(e);
        }
      }
      console.log(this.CardsFiltered);
    }
  constructor(private TitleService: Title, private langService: TranslationService) {
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
