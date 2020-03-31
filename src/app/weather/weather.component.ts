import { Component, OnInit } from '@angular/core';
import { RootObject } from '../IWeather';
import { HttpClient } from '@angular/common/http';
import { GetlocationService } from '../getlocation.service';
import { ILanguage } from 'src/app/ILanguage';
import { Subscription } from 'rxjs';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  WeatherData: RootObject;
  Location: GetlocationService;
  Language: ILanguage;
  LangSubscription: Subscription;
  Url: string;
  Lat: string;
  Lon: string;

  constructor(
    private location: GetlocationService,
    http: HttpClient,
    private langService: TranslationService
  ) {
    this.Language = langService[langService.language];
    this.LangSubscription = langService.languageChange.subscribe(value => {
      this.Language = value;
      this.Url =
        'https://api.openweathermap.org/data/2.5/weather?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&lat=' +
        this.Lat +
        '&lon=' +
        this.Lon;
      if (langService.language === 'PT') {
        this.Url += '&lang=pt';
      }
      http.get<RootObject>(this.Url).subscribe(result => {
        this.WeatherData = result;
      });
    });
    this.Location = location;
    this.Location.getLocation().subscribe(rep => {
      this.Lat = rep.coords.latitude;
      this.Lon = rep.coords.longitude;
      this.Url =
        'https://api.openweathermap.org/data/2.5/weather?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&lat=' +
        this.Lat +
        '&lon=' +
        this.Lon;
      if (langService.language === 'PT') {
        this.Url += '&lang=pt';
      }
      http.get<RootObject>(this.Url).subscribe(result => {
        this.WeatherData = result;
      });
    });
  }
  ngOnInit(): void {}
}
