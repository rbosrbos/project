import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherforecastComponent } from './weatherforecast/weatherforecast.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { BrowseComponent } from './browse/browse.component';
import { ContactComponent } from './contact/contact.component';



const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'forecast', component: WeatherforecastComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
