import { Component, OnInit } from "@angular/core";
import { RootObject } from '../IWeather';
import { HttpClient } from "@angular/common/http";
import { GetlocationService } from "../getlocation.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"]
})
export class WeatherComponent implements OnInit {
  weatherData:RootObject;
  location:GetlocationService;
  constructor(private _location: GetlocationService,http: HttpClient) {
    this.location = _location;
     this.location.getLocation().then(
      coords => {
        let url = "http://api.openweathermap.org/data/2.5/weather?appid=02575ed4ec5d28bce7934bd25e413ba1&units=metric&lat="+coords[0]+"&lon="+coords[1];
        http.get<RootObject>(url)
        .subscribe(
          result=>{
            this.weatherData = result;
          });
      
    })
  }
  ngOnInit(): void {
  }
}
