import { Component, OnInit } from '@angular/core';
import { RootObject } from '../IWeather';
import { GetlocationService } from '../getlocation.service';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../translation.service';
import { Title } from '@angular/platform-browser';
import { ILanguage } from 'src/ILanguage';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.scss']
})
export class WeatherforecastComponent implements OnInit {
  Language :ILanguage;
  WeatherSubject: Subject<object> = new Subject<object>();
  weatherData: object;
  Location: GetlocationService;
  Title: Subject<string> = new Subject<string>();
  LangSubscription: Subscription;

  constructor(
    private location: GetlocationService,
    private http: HttpClient,
    private TitleService: Title,
    private langService: TranslationService) {
      this.Language = langService[langService.language];
      this.Title.subscribe((data)=>{
        TitleService.setTitle(langService.pageTitle + ' - ' + data);
      });
      this.Title.next(this.Language.weatherforecastTitle);
      this.LangSubscription = langService.languageChange.subscribe((value) => {
          this.Language = value;
          this.Title.next(value.weatherforecastTitle);
      });
      this.WeatherSubject.subscribe((data) => {
        this.weatherData = data;
      });
      this.Location = location;
      this.location.getLocation().then(
        coords => {
          const url = 'https://api.openweathermap.org/data/2.5/forecast?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&lat='
          + coords[0]
          + '&lon='
          + coords[1];
          http.get<any>(url)
          .subscribe(
            result => {
              this.WeatherSubject.next(result.list);
            });
      });
  }
  ngOnInit(): void {}
}
