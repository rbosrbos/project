import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/ILanguage';
import { TranslationService } from '../translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  Language: ILanguage;
  subscription: Subscription;

  constructor(private langService: TranslationService) { 
    this.Language = langService[langService.language];
        this.subscription = langService.languageChange.subscribe((value) => {
            this.Language = value;
        })
  }

  ngOnInit(): void {
  }

}
