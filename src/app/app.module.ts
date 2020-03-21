import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser, faTree, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherforecastComponent } from './weatherforecast/weatherforecast.component';
import { ConstantsService } from './constants.service';
import { GetlocationService } from './getlocation.service';
import { MainpageComponent } from './mainpage/mainpage.component';
import { BrowseComponent } from './browse/browse.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherComponent,
    WeatherforecastComponent,
    MainpageComponent,
    BrowseComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Title,
    ConstantsService,
    GetlocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUser, faTree, faChevronDown);
  }
}
