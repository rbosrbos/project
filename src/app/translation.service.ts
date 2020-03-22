import { Injectable } from '@angular/core';
import { ILanguage } from 'src/app/ILanguage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  languageChange: Subject<ILanguage> = new Subject<ILanguage>();
  language = 'EN';
  pageTitle = 'LusoNature';
  EN = {
    home: 'Home',
    browse: {
      name: 'Browse',
      categories: [
        'All',
        'Beaches',
        'Forests',
        'Parks'
      ],
      region: [
        'All',
        'North',
        'Center',
        'South'
      ]
    },
    categories: 'Categories',
    region: 'Region',
    contact: 'Contact us',
    changeTheme: 'Change Theme',
    changeThemeOptions: [
      'Cream',
      'Greenish',
      'Marine',
      'QuickSilver',
      'The Best (Default)'
    ],
    goBack: 'Go back',
    navbarSunrise: 'Sunrise',
    navbarSunset: 'Sunset',
    mainpageHeader: 'Welcome to LusoNature!',
    mainpageContent:
      'Here you\'ll find the best Portuguese green spots for your freetime. You can choose and plan everything thanks ' +
      'to our rating system by our users. Go on, take a look! And please respect the NATURE! ;)',
    mainpageMostvisited: 'Top viewed places:',
    weatherforecastTitle: 'Weather Forecast',
    contactMessage: 'Message',
    contactPlaceholderMessage: 'Tell us your message'
  };
  PT = {
    home: 'Inicio',
    browse: {
      name: 'Navegar',
      categories: [
        'Todas',
        'Praias',
        'Florestas',
        'Parques'
      ],
      region: [
        'Todas',
        'Norte',
        'Centro',
        'Sul'
      ]
    },
    categories: 'Categorias',
    region: 'Região',
    contact: 'Contacte-nos',
    changeTheme: 'Mudar Tema',
    changeThemeOptions: [
      'Creme',
      'Esverdeado',
      'Marinho',
      'Prateado',
      'O melhor (por defeito'
    ],
    goBack: 'Voltar',
    navbarSunrise: 'Nascer do sol',
    navbarSunset: 'Pôr do sol',
    mainpageHeader: 'Bem vindo à LusoNature!',
    mainpageContent:
      'Aqui poderá encontrar os melhores locais naturais do nosso país. Pode escolher e planear tudo graças ao nosso ' +
      'sistema de rating. Dê uma espreitadela! E por favor, respeite a Natureza! ;)',
    mainpageMostvisited: 'Locais mais visitados:',
    weatherforecastTitle: 'Previsão Meteorológica',
    contactMessage: 'Mensagem',
    contactPlaceholderMessage: 'Escreva aqui a sua mensagem'
  };
  changeLang(lang: string) {
    this.language = lang;
    this.languageChange.next(this[lang]);
  }
}
