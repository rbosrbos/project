import { Component, OnInit } from '@angular/core';
import { RootObject } from '../IWeather';
import { HttpClient } from '@angular/common/http';
import { GetlocationService } from '../getlocation.service';
import { ILanguage } from 'src/ILanguage';
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

  constructor(private location: GetlocationService, http: HttpClient, private langService: TranslationService) {
    this.Language = langService[langService.language];
    this.LangSubscription = langService.languageChange.subscribe((value) => {
        this.Language = value;
    });
    this.Location = location;
    this.location.getLocation().then(
      coords => {
        const url = 'https://api.openweathermap.org/data/2.5/weather?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&lat='
        + coords[0]
        + '&lon='
        + coords[1];
        http.get<RootObject>(url)
        .subscribe(
          result => {
            this.WeatherData = result;
          });
    });
  }
  ngOnInit(): void {
  }
}
