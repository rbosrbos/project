import { Component, OnInit } from "@angular/core";
import { GetlocationService } from "../getlocation.service";
import { HttpClient } from "@angular/common/http";
import { TranslationService } from "../translation.service";
import { Title } from "@angular/platform-browser";
import { ILanguage } from "src/app/ILanguage";
import { Subject, Subscription } from "rxjs";
import { IForecast } from "../IForecast";
import { RootObject } from "../IWeather";

@Component({
  selector: "app-weatherforecast",
  templateUrl: "./weatherforecast.component.html",
  styleUrls: ["./weatherforecast.component.scss"]
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
  Lat: string;
  Lon: string;
  Url: string;

  scrollToMap() {
    document.getElementById("map").scrollIntoView({ behavior: "smooth" });
  }

  showWeather(e) {
    this.Url =
      "https://api.openweathermap.org/data/2.5/forecast?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&id=";
    switch (e.target.dataset.city) {
      case "Acores":
        this.Url += "3411865";
        this.CurrentPlace = "Açores";
        break;
      case "Aveiro":
        this.Url += "2742610";
        this.CurrentPlace = "Aveiro";
        break;
      case "Beja":
        this.Url += "2270984";
        this.CurrentPlace = "Beja";
        break;
      case "Braga":
        this.Url += "2742031";
        this.CurrentPlace = "Braga";
        break;
      case "Braganca":
        this.Url += "2742026";
        this.CurrentPlace = "Bragança";
        break;
      case "Castelo-Branco":
        this.Url += "2269513";
        this.CurrentPlace = "Castelo Branco";
        break;
      case "Coimbra":
        this.Url += "2740636";
        this.CurrentPlace = "Coimbra";
        break;
      case "Evora":
        this.Url += "2268404";
        this.CurrentPlace = "Évora";
        break;
      case "Faro":
        this.Url += "2268337";
        this.CurrentPlace = "Faro";
        break;
      case "Guarda":
        this.Url += "2738782";
        this.CurrentPlace = "Guarda";
        break;
      case "Leiria":
        this.Url += "2267094";
        this.CurrentPlace = "Leiria";
        break;
      case "Lisboa":
        this.Url += "2267056";
        this.CurrentPlace = "Lisboa";
        break;
      case "Madeira":
        this.Url += "2593105";
        this.CurrentPlace = "Madeira";
        break;
      case "Portalegre":
        this.Url += "2264507";
        this.CurrentPlace = "Portalegre";
        break;
      case "Porto":
        this.Url += "2735941";
        this.CurrentPlace = "Porto";
        break;
      case "Santarem":
        this.Url += "2263478";
        this.CurrentPlace = "Santarém";
        break;
      case "Setubal":
        this.Url += "2262963";
        this.CurrentPlace = "Setúbal";
        break;
      case "Viana-do-Castelo":
        this.Url += "2732772";
        this.CurrentPlace = "Viana do Castelo";
        break;
      case "Vila-Real":
        this.Url += "2732437";
        this.CurrentPlace = "Vila Real";
        break;
      case "Viseu":
        this.Url += "2732264";
        this.CurrentPlace = "Viseu";
        break;
    }
    if (this.langService.language === "PT")  {
      this.Url += "&lang=pt";
    }
    this.http.get<any>(this.Url).subscribe(result => {
      const custom = result.list;
      custom[0].city = result.city.name + " - " + result.city.country;
      this.WeatherSubject.next(custom);
    });
  }
  constructor(
    private location: GetlocationService,
    private http: HttpClient,
    private TitleService: Title,
    private langService: TranslationService
  ) {
    this.Language = langService[langService.language];
    this.Title.subscribe(data => {
      TitleService.setTitle(langService.pageTitle + " - " + data);
    });
    this.Title.next(this.Language.weatherforecastTitle);
    this.LangSubscription = langService.languageChange.subscribe(value => {
      this.Language = value;
      this.Title.next(value.weatherforecastTitle);
      this.Url = this.Url.split("&lang")[0];
      if (langService.language === 'PT') {
        this.Url += "&lang=pt";
      }
      this.http.get<any>(this.Url).subscribe(result => {
        const custom = result.list;
        custom[0].city = result.city.name + " - " + result.city.country;
        this.WeatherSubject.next(custom);
      });
    });
    this.WeatherSubject.subscribe(data => {
      this.WeatherForecastData = data;
      let fullDate = new Date(this.WeatherForecastData[0].dt * 1000);
      let day = fullDate.getDate();
      let month = fullDate.getMonth() + 1;
      let date =
        (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month);
      let lastDate = date;
      let weathers = [];
      const localDates = [];

      for (const item of Object.keys(this.WeatherForecastData)) {
        fullDate = new Date(this.WeatherForecastData[item].dt * 1000);
        const time = fullDate.getHours();
        let hour = time.toString();
        if (time < 10) {
          hour = "0" + time.toString();
        }
        day = fullDate.getDate();
        month = fullDate.getMonth() + 1;
        date =
          (day < 10 ? "0" + day : day) +
          "/" +
          (month < 10 ? "0" + month : month);

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

        if (parseInt(item, 10) === this.WeatherForecastData.length - 1) {
          localDates.push({
            day: lastDate,
            weathers
          });
          lastDate = date;
          weathers = [];
        }
      }
      this.Dates = localDates;
    });
    this.Location = location;
    this.Location.getLocation().subscribe(rep => {
      this.Lat = rep.coords.latitude;
      this.Lon = rep.coords.longitude;
      this.Url =
        "https://api.openweathermap.org/data/2.5/forecast?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&lat=" +
        this.Lat +
        "&lon=" +
        this.Lon;
      http.get<any>(this.Url).subscribe(result => {
        const custom = result.list;
        this.CurrentPlace = result.city.name + " - " + result.city.country;
        this.WeatherSubject.next(custom);
      });
    });
  }
  ngOnInit(): void {}
}
