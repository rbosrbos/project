import { Component, OnInit } from '@angular/core';
import { RootObject } from '../IWeather';
import { GetlocationService } from '../getlocation.service';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '../title.service';
import { TranslationService } from '../translation.service';


@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.scss']
})
export class WeatherforecastComponent implements OnInit {
  DefaultLanguage: object;
  WeatherData: RootObject;
  Location: GetlocationService;

  constructor(
    private location: GetlocationService,
    private http: HttpClient,
    private title: TitleService,
    private langService: TranslationService) {
    this.Location = location;
    title.setTitle(langService.pageTitle + ' - ' + langService.EN.weatherforecastTitle);
    this.Location.getLocation().then(
      coords => {
        const url = 'https://api.openweathermap.org/data/2.5/forecast?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&lat='
        + coords[0] + '&lon=' + coords[1];
        http.get<RootObject>(url)
        .subscribe(
          result => {
            this.WeatherData = result;
          });
    });
  }
  ngOnInit(): void {}
}
