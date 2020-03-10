import { Injectable } from '@angular/core';
import { ILanguage } from 'src/ILanguage';
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
    browse: 'Browse',
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
    mainpageTitle: 'Home',
    mainpageHeader: 'Welcome to LusoNature!',
    mainpageContent:
      'Here you\'ll find the best Portuguese green spots for your freetime. You can choose and plan everything thanks ' +
      'to our rating system by our users. Go on, take a look! And please respect the NATURE! ;)',
    mainpageMostvisited: 'Top viewed places:',
    weatherforecastTitle: 'Weather Forecast'
  };
  PT = {
    home: 'Inicio',
    browse: 'Navegar',
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
    mainpageTitle: 'LusoNature - Início',
    mainpageHeader: 'Bem vindo à LusoNature!',
    mainpageContent:
      'Aqui poderá encontrar os melhores locais naturais do nosso país. Pode escolher e planear tudo graças ao nosso ' +
      'sistema de rating. Dê uma espreitadela! E por favor, respeite a Natureza! ;)',
    mainpageMostvisited: 'Locais mais visitados:',
    weatherforecastTitle: 'Previsão Meteorológica'
  };
  changeLang(lang: string) {
    this.language = lang;
    this.languageChange.next(this[lang]);
  }
}

