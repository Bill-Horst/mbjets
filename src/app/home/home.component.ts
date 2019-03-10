import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private language: string = this.languageService.getLanguage();
  languageSubscription: Subscription;

  homeHeader;
  servicesHeader;
  servicesHeaderTop;
  servicesHeaderBottom;
  servicesP1;
  servicesP2;
  servicesP3;
  expHeader;
  hqHeader;
  fastHeader;
  expP1;
  hqP1;
  fastP1;
  contactButton;
  checkRateButton;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languageSubscription = this.languageService.triggerLanguageChange.subscribe((language: string) => {
      this.setTranslations(language);
    });
    this.setTranslations(this.language);
  }

  setTranslations(language: string) {
    let langTrans = this.translations[language];

    this.homeHeader = langTrans.homeHeader;
    this.servicesHeader = langTrans.servicesHeader;
    this.servicesHeaderTop = langTrans.servicesHeaderTop;
    this.servicesHeaderBottom = langTrans.servicesHeaderBottom;
    this.servicesP1 = langTrans.servicesP1;
    this.servicesP2 = langTrans.servicesP2;
    this.servicesP3 = langTrans.servicesP3;
    this.expHeader = langTrans.expHeader;
    this.hqHeader = langTrans.hqHeader;
    this.fastHeader = langTrans.fastHeader;
    this.expP1 = langTrans.expP1;
    this.hqP1 = langTrans.hqP1;
    this.fastP1 = langTrans.fastP1;
    this.contactButton = langTrans.contactButton;
    this.checkRateButton = langTrans.checkRateButton;
  }

  private translations: {} = {
    english: {
      homeHeader: 'Welcome to MBJETS',
      servicesHeaderTop: 'Japanese ←→ English',
      servicesHeaderBottom: 'Tech Translations',
      servicesP1: 'Japanese ←→ English translation services on topics having to do with all things technology',
      servicesP2: 'All translation work done by a native speaker of the target language',
      servicesP3: 'Editing / proofreading and English transcription services also offered',
      expHeader: 'Twice the Experience',
      hqHeader: 'Twice the Quality',
      fastHeader: 'Twice as Fast',
      expP1: 'Two experienced translators, one whose native language is the source and one whose native language is the target.',
      hqP1: 'With two sets of eyes on every translation, two experienced translators get it done right.',
      fastP1: 'Through the synergy of two humans collaborating on your translation, it gets done fast.',
      contactButton: 'Contact Us',
      checkRateButton: 'Check Rates'
    },
    japanese: {
      homeHeader: 'MBJETSへようこそ',
      servicesHeaderTop: '日←→英テックの',
      servicesHeaderBottom: '翻訳サービス',
      servicesP1: 'テックの全てについての日本語から英語の翻訳サービス',
      servicesP2: '日←→英翻訳の全ては英語のネイティブスピーカーがやります',
      servicesP3: '書類の編集も英語の採録サービスも提供しています',
      expHeader: '倍の経験',
      hqHeader: '倍の品質',
      fastHeader: '倍の速さ',
      expP1: '2人の経験豊富な翻訳者、1人は母国語がソース、もう1人は母国語がターゲットです。',
      hqP1: 'すべての翻訳に2セットの目を向け、2人の経験豊富な翻訳者がそれを正しく行います。',
      fastP1: '2人の人間が翻訳に協力することの相乗効果を通して、それは速く行われます。',
      contactButton: '問い合わせ',
      checkRateButton: '値段'
    }
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

}
