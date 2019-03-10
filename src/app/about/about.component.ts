import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  private language: string = this.languageService.getLanguage();
  languageSubscription: Subscription;

  introHeader;
  mayumiName;
  billName;
  mayIntroP1;
  mayIntroP2;
  billIntroP1;
  billIntroP2;

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
    this.mayumiName = langTrans.mayumiName;
    this.billName = langTrans.billName;
    this.mayIntroP1 = langTrans.mayIntroP1;
    this.mayIntroP2 = langTrans.mayIntroP2;
    this.billIntroP1 = langTrans.billIntroP1;
    this.billIntroP2 = langTrans.billIntroP2;
  }

  private translations: {} = {
    english: {
      introHeader: 'Meet the Team',
      mayumiName: 'Mayumi',
      billName: 'Bill',
      mayIntroP1: 'Mayumi was born and raised in Japan and had a very extensive English education. She became an English teacher after college where she learned by teaching.',
      mayIntroP2: 'She moved to the United States in 2015, where she\'s been living and working, continually improving her English.',
      billIntroP1: 'Bill was born and raised in the United States and grew up multilingual. He moved to Japan in 2009 where he learned Japanese at work and began freelance translating professionally.',
      billIntroP2: 'He moved back to the United States in 2015 where he works as a software engineer, a tech writer, and freelance Japanese to English translator.'
    },
    japanese: {
      introHeader: 'チームの紹介',
      mayumiName: 'まゆみ',
      billName: 'ビル',
      mayIntroP1: 'まゆみは日本で生まれ育ち、非常に幅広い英語教育を受けました。 彼女は大学卒業後、英語の教師になりました。',
      mayIntroP2: '彼女は2015年にアメリカに引っ越しました。そこで彼女は生活し仕事をしていて、継続的に英語を上達させています。',
      billIntroP1: 'ビルはアメリカで生まれ育ち、多言語で育ちました。 彼は2009年に日本に引っ越し、そこで職場で日本語を学び、プロとして翻訳を始めました。',
      billIntroP2: '彼は2015年にアメリカに戻り、そこでソフトウェアエンジニア、テクニカルライター、そしてフリーランスの日本語から英語への翻訳者として働いています。'
    }
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

}

