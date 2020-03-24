import { Component, OnInit } from '@angular/core';
import { GetlocationService } from '../getlocation.service';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../translation.service';
import { Title } from '@angular/platform-browser';
import { ILanguage } from 'src/app/ILanguage';
import { Subject, Subscription } from 'rxjs';
import { IForecast } from '../IForecast';
import { RootObject } from '../IWeather';


@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.scss']
})
export class WeatherforecastComponent implements OnInit {
  Http: HttpClient;
  Language: ILanguage;
  WeatherSubject: Subject<IForecast[]> = new Subject<IForecast[]>();
  WeatherForecastData: IForecast[];
  Location: GetlocationService;
  Title: Subject<string> = new Subject<string>();
  LangSubscription: Subscription;
  CurrentPlace: string;
  Dates: any[];

  scrollToMap() {
    document.getElementById('map').scrollIntoView({behavior: 'smooth'});
  }

  showWeather(e) {

    let url = 'https://api.openweathermap.org/data/2.5/forecast?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&id=';
    console.log(e.target.dataset.city);
    switch (e.target.dataset.city) {
      case 'Acores':
        url += '3411865';
        this.CurrentPlace = 'Açores';
        break;
      case 'Aveiro':
        url += '2742610';
        this.CurrentPlace = 'Aveiro';
        break;
      case 'Beja':
        url += '2270984';
        this.CurrentPlace = 'Beja';
        break;
      case 'Braga':
        url += '2742031';
        this.CurrentPlace = 'Braga';
        break;
      case 'Braganca':
        url += '2742026';
        this.CurrentPlace = 'Bragança';
        break;
      case 'Castelo-Branco':
        url += '2269513';
        this.CurrentPlace = 'Castelo Branco';
        break;
      case 'Coimbra':
        url += '2740636';
        this.CurrentPlace = 'Coimbra';
        break;
      case 'Evora':
        url += '2268404';
        this.CurrentPlace = 'Évora';
        break;
      case 'Faro':
        url += '2268337';
        this.CurrentPlace = 'Faro';
        break;
      case 'Guarda':
        url += '2738782';
        this.CurrentPlace = 'Guarda';
        break;
      case 'Leiria':
        url += '2267094';
        this.CurrentPlace = 'Leiria';
        break;
      case 'Lisboa':
        url += '2267056';
        this.CurrentPlace = 'Lisboa';
        break;
      case 'Madeira':
        url += '2593105';
        this.CurrentPlace = 'Madeira';
        break;
      case 'Portalegre':
        url += '2264507';
        this.CurrentPlace = 'Portalegre';
        break;
      case 'Porto':
        url += '2735941';
        this.CurrentPlace = 'Porto';
        break;
      case 'Santarem':
        url += '2263478';
        this.CurrentPlace = 'Santarém';
        break;
      case 'Setubal':
        url += '2262963';
        this.CurrentPlace = 'Setúbal';
        break;
      case 'Viana-do-Castelo':
        url += '2732772';
        this.CurrentPlace = 'Viana do Castelo';
        break;
      case 'Vila-Real':
        url += '2732437';
        this.CurrentPlace = 'Vila Real';
        break;
      case 'Viseu':
        url += '2732264';
        this.CurrentPlace = 'Viseu';
        break;
    }
    this.http.get<any>(url)
          .subscribe(
            result => {
              const custom = result.list;
              custom[0].city = result.city.name + ' - ' + result.city.country;
              this.WeatherSubject.next(custom);
            });
  }
  constructor(
    private location: GetlocationService,
    private http: HttpClient,
    private TitleService: Title,
    private langService: TranslationService) {
      this.Language = langService[langService.language];
      this.Title.subscribe((data) => {
        TitleService.setTitle(langService.pageTitle + ' - ' + data);
      });
      this.Title.next(this.Language.weatherforecastTitle);
      this.LangSubscription = langService.languageChange.subscribe((value) => {
          this.Language = value;
          this.Title.next(value.weatherforecastTitle);
      });
      this.WeatherSubject.subscribe((data) => {
        this.WeatherForecastData = data;
        // this.CurrentPlace = data[0].city;
        // console.log(data);
        let fullDate = new Date(this.WeatherForecastData[0].dt * 1000);
        let day = fullDate.getDate();
        let month = fullDate.getMonth() + 1;
        let date = (((day < 10) ? '0' + day : day) + '/' + ((month < 10) ? '0' + month : month));
        let lastDate = date;
        let weathers = [];
        const localDates = [];

        for (const item of Object.keys(this.WeatherForecastData)) {
          fullDate = new Date(this.WeatherForecastData[item].dt * 1000);
          const time = fullDate.getHours();
          let hour = time.toString();
          if (time < 10) {
            hour = '0' + time.toString();
          }
          day = fullDate.getDate();
          month = fullDate.getMonth() + 1;
          date = (((day < 10) ? '0' + day : day) + '/' + ((month < 10) ? '0' + month : month));

          if (date !== lastDate) {
            localDates.push({
              day: lastDate,
              weathers
            });
            lastDate = date;
            weathers = [];
          }
          this.WeatherForecastData[item].weather.forEach(element => {
            element.temp = this.WeatherForecastData[item].main.temp;
            element.hour = hour;
            weathers.push(element);
          });

          if (parseInt(item, 10) === (this.WeatherForecastData.length - 1)) {
            localDates.push({
              day: lastDate,
              weathers
            });
            lastDate = date;
            weathers = [];
          }
        }
        this.Dates = localDates;
        // console.log(this.Dates);
      });
      this.Location = location;
      this.Location.getLocation().subscribe(rep => {
          const url = 'https://api.openweathermap.org/data/2.5/forecast?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&lat='
                    + rep.coords.latitude
                    + '&lon='
                    + rep.coords.longitude;
          http.get<any>(url)
          .subscribe(
            result => {
              const custom = result.list;
              this.CurrentPlace = result.city.name + ' - ' + result.city.country;
              this.WeatherSubject.next(custom);
            });
      });
  }
  ngOnInit(): void {}
}
