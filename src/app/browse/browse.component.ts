import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/ILanguage';
import { TranslationService } from '../translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  Language: ILanguage;
  subscription: Subscription;

  constructor(private langService: TranslationService) { 
    this.Language = langService[langService.language];
        this.subscription = langService.languageChange.subscribe((value) => {
            this.Language = value;
        })
  }

  ngOnInit(): void {}

}
