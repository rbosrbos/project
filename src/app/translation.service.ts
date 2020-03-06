import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  Actual = 'EN';
  pageTitle = 'LusoNature';
  EN = {
    home: 'Home',
    browse: 'Browse',
    changeTheme: 'Change Theme',
    changeThemeOptions:[
      "Cream (Default)",
      "Blueish",
      "Purpleish",
      "QuickSilver"
    ],
    mainpageTitle: 'Home',
    mainpageHeader: 'Welcome to LusoNature!',
    mainpageContent:
      'Here you\'ll find the best Portuguese green spots for your freetime. You can choose and plan everything thanks ' +
      'to our rating system by our users. Go on, take a look! And please respect the NATURE! ;)',
    navbarSunrise: 'Sunrise',
    navbarSunset: 'Sunset',
    weatherforecastTitle: 'Weather Forecast'
  };
  PT = {
    home: 'Inicio',
    browse: 'Navegar',
    changeTheme: 'Mudar Tema',
    changeThemeOptions: [
      "Creme (Por defeito)",
      "Azulado",
      "Arroxado",
      "Prateado"
    ],
    mainpageTitle: 'LusoNature - Início',
    mainpageHeader: 'Bem vindo à LusoNature!',
    mainpageContent:
      'Aqui poderá encontrar os melhores locais naturais do nosso país. Pode escolher e planear tudo graças ao nosso ' +
      'sistema de rating. Dê uma espreitadela! E por favor, respeite a Natureza! ;)',
    navbarSunrise: 'Nascer do sol',
    navbarSunset: 'Pôr do sol',
    weatherforecastTitle: 'Previsão Meteorológica'
  };
  changeLang(lang: string) {
    this.Actual = lang;
  }
  constructor() {}
}
