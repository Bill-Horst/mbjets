import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private language: string = this.languageService.getLanguage();
  languageSubscription: Subscription;

  contactNav: string;
  aboutNav: string;
  workNav: string;
  ratesNav: string;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languageSubscription = this.languageService.triggerLanguageChange.subscribe((language: string) => {
      this.setTranslations(language);
    });
    this.setTranslations(this.language);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  newLanguageChosen(language: string) {
    this.languageService.setLanguage(language);
  }

  setTranslations(language: string) {
    let langTrans = this.translations[language];

    this.contactNav = langTrans.contactNav;
    this.aboutNav = langTrans.aboutNav;
    this.workNav = langTrans.workNav;
    this.ratesNav = langTrans.ratesNav;
  }

  private translations: {} = {
    english: {
      contactNav: 'Contact',
      aboutNav: 'About',
      workNav: 'Work',
      ratesNav: 'Rates'
    },
    japanese: {
      contactNav: '問い合わせた',
      aboutNav: '自己紹介',
      workNav: 'ワーク',
      ratesNav: '値段'
    }
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
