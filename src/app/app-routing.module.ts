import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherforecastComponent } from './weatherforecast/weatherforecast.component';
import { MainpageComponent } from './mainpage/mainpage.component';


const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'forecast', component: WeatherforecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
