import { Component, OnInit, Input } from '@angular/core';
import { GetlocationService } from '../getlocation.service';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../translation.service';
import { Title } from '@angular/platform-browser';
import { ILanguage } from 'src/app/ILanguage';
import { Subject, Subscription } from 'rxjs';
import { IForecast } from '../IForecast';


@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.scss']
})
export class WeatherforecastComponent implements OnInit {
  Language: ILanguage;
  WeatherSubject: Subject<IForecast[]> = new Subject<IForecast[]>();
  WeatherForecastData: IForecast[];
  Location: GetlocationService;
  Title: Subject<string> = new Subject<string>();
  LangSubscription: Subscription;
  Dates: any[];

  mousemove = (e): void => {
    let x = e.clientX,
        y = e.clientY;
    const tooltip = document.getElementById('tooltip');
    tooltip.style.top = (y - 20) + 'px';
    tooltip.style.left = x + 'px';
    if ((e.toElement.id !== 'map') && (e.toElement.id !== 'svg') && (e.toElement.id !== '')) {
      tooltip.innerHTML = this.Language.weatherforecastTitle;
    }
    else {
      tooltip.innerHTML = '';
    }
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
        console.log(data);
        let fullDate = new Date(this.WeatherForecastData[0].dt * 1000);
        let day = fullDate.getDate();
        let month = fullDate.getMonth() + 1;
        let date = (((day < 10) ? '0' + day : day) + '/' + ((month < 10) ? '0' + month : month));
        let lastDate = date;
        let weathers = [];
        const localDates = [];

        for (const item of Object.keys(this.WeatherForecastData)) {
          fullDate = new Date(this.WeatherForecastData[item].dt * 1000);
          let time = fullDate.getHours();
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
        console.log(this.Dates);
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
              this.WeatherSubject.next(result.list);
            });
      });
  }
  ngOnInit(): void {
    document.getElementById('map').addEventListener('mousemove', this.mousemove, true);
  }
}
