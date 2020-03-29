import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser, faTree, faChevronDown, faParking, faRestroom, faUtensils, faTimes, faCog } from '@fortawesome/free-solid-svg-icons';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherforecastComponent } from './weatherforecast/weatherforecast.component';
import { ConstantsService } from './constants.service';
import { GetlocationService } from './getlocation.service';
import { MainpageComponent } from './mainpage/mainpage.component';
import { BrowseComponent } from './browse/browse.component';
import { FormsModule } from '@angular/forms';
import { ModalService } from './modal.service';
import { CarouselComponent } from './carousel/carousel.component';
import { AgmCoreModule } from '@agm/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherComponent,
    WeatherforecastComponent,
    MainpageComponent,
    BrowseComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    LazyLoadImageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9DGej9ucJeg_z3jQutl1g_v2BWvvNltU'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    Title,
    ConstantsService,
    GetlocationService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUser, faTree, faChevronDown, faParking, faRestroom, faUtensils, faTimes, faCog);
  }
}
