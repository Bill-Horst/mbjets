import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private language: string = this.languageService.getLanguage();
  languageSubscription: any;

  private introHeader;
  private introParagraph;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languageSubscription = this.languageService.triggerLanguageChange.subscribe((language: string) => {
      this.setTranslations(language);
    });
    this.setTranslations(this.language);
  }

  setTranslations(language: string) {
    let langTrans = this.translations[language];
    this.introHeader = langTrans.introHeader;
    this.introParagraph = langTrans.introParagraph;
  }

  private translations: {} = {
    english: {
      introHeader: 'Intro Header',
      introParagraph: 'Our intro paragraph is longer than the header'
    },
    japanese: {
      introHeader: '自己紹介',
      introParagraph: '私たちは話します日本語'
    }
  }

}

