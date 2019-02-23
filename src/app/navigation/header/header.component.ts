import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private language: string = this.languageService.getLanguage();
  languageSubscription: any;

  private contactNav: string;
  private aboutNav: string;
  private workNav: string;
  private ratesNav: string;

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
}
