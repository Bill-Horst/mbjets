import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs/Subscription';
import { loadInternal } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit, OnDestroy {

  private language: string = this.languageService.getLanguage();
  languageSubscription: Subscription;

  ratesHeader;
  generalLabel;
  technicalLabel;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languageSubscription = this.languageService.triggerLanguageChange.subscribe((language: string) => {
      this.setTranslations(language);
    });
    this.setTranslations(this.language);
  }

  setTranslations(language: string) {
    let langTrans = this.translations[language];
    
    this.ratesHeader = langTrans.ratesHeader;
    this.generalLabel = langTrans.generalLabel;
    this.technicalLabel = langTrans.technicalLabel;
  }

  private translations: {} = {
    english: {
      ratesHeader: 'Get an Estimate',
      generalLabel: 'General Rates',
      technicalLabel: 'Technical Rates'
    },
    japanese: {
      ratesHeader: 'JJJ Get an Estimate',
      generalLabel: 'jjj General Rates',
      technicalLabel: 'JJJ Technical Rates'
    }
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

}
