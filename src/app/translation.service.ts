import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  lang = [
    {
      name: 'English',
      val: {
        home: 'Home',
        browse: 'Browse'
      }
    },
    {
      name: 'Portuguese'
    }
  ];

  constructor() { }
}
