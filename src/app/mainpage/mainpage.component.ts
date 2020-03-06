import { Component, OnInit, Input } from '@angular/core';
import { TitleService } from '../title.service';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  @Input('title') pageName: string;

  constructor(private title: TitleService, private langService: TranslationService) { 
    title.setTitle(langService.pageTitle + ' - ' + langService.EN.mainpageTitle);
  }

  ngOnInit(): void {
  }

}
