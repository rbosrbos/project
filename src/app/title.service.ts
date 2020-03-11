import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
langService: TranslationService;
  public constructor(private titleService: Title) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
