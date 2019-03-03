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
      mayIntroP1: 'Mayumi was born and raised in Japan and had a very extensive English education. She became in English teacher after college where she honed her English skills even more.',
      mayIntroP2: 'She moved to the United States in 2015, where she\'s been living and working, continually improving her English.',
      billIntroP1: 'Bill was born and raised in the United States and grew up multilingual. On a whim, he moved to Japan and started studying Japanese, where he quickly improved and became a Japanese to English translator.',
      billIntroP2: 'He moved back to the United States in 2015 where he works as a software engineer and freelance Japanese to English translator.'
    },
    japanese: {
      introHeader: 'チームの紹介',
      mayumiName: 'まゆみ',
      billName: 'ビル',
      mayIntroP1: 'JJJ Mayumi was born and raised in Japan and had a very extensive English education. She became in English teacher after college where she honed her English skills even more.',
      mayIntroP2: 'JJJ She moved to the United States in 2015, where she\'s been living and working, continually improving her English.',
      billIntroP1: 'JJJ Bill was born and raised in the United States and grew up multilingual. On a whim, he moved to Japan and started studying Japanese, where he quickly improved and became a Japanese to English translator.',
      billIntroP2: 'JJJ He moved back to the United States in 2015 where he works as a software engineer and freelance Japanese to English translator.'
    }
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

}

