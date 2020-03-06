import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  pageTitle = 'LusoNature';
  EN = {
    home: 'Home',
    browse: 'Browse',
    changeTheme: 'Change Theme',
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
    changeTheme: 'Tema',
    mainpageTitle: 'LusoNature - Início',
    mainpageHeader: 'Bem vindo à LusoNature!',
    mainpageContent:
      'Aqui poderá encontrar os melhores locais naturais do nosso país. Pode escolher e planear tudo graças ao nosso ' +
      'sistema de rating. Dê uma espreitadela! E por favor, respeite a Natureza! ;)',
    navbarSunrise: 'Nascer do sol',
    navbarSunset: 'Pôr do sol',
    weatherforecastTitle: 'Previsão Meteorológica'
  };

  constructor() {}
}
