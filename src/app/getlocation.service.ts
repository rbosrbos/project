import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetlocationService {
  getLocation(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(Error('No support for geolocation'));
        return;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        resolve([latitude.toString(), longitude.toString()]);
      });
    });
  }
  constructor() { }
}
