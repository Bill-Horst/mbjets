import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private language: string = this.languageService.getLanguage();
  languageSubscription: any;

  private namePlaceholder: string;
  private emailPlaceholder: string;
  private notesPlaceholder: string;
  private submitButtonValue: string;
  private nameHint: string;
  private nameError: string;
  private emailError: string;

  contactForm: FormGroup;

  constructor(private router: Router, private languageService: LanguageService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      userName: new FormControl('', {validators: [Validators.required]}),
      userEmail: new FormControl('', {validators: [Validators.required, Validators.email]}),
      userNotes: new FormControl('', {validators: []})
    });
    this.languageSubscription = this.languageService.triggerLanguageChange.subscribe((language: string) => {
      this.setTranslations(language);
    });
    this.setTranslations(this.language);
  }

  onSubmit() {
    console.log(this.contactForm);
    this.router.navigate(['/thankyou']);
  }

  setTranslations(language: string) {
    let langTrans = this.translations[language];

    this.namePlaceholder = langTrans.namePlaceholder;
    this.emailPlaceholder = langTrans.emailPlaceholder;
    this.notesPlaceholder = langTrans.notesPlaceholder;
    this.submitButtonValue = langTrans.submitButtonValue;
    this.nameHint = langTrans.nameHint;
    this.nameError = langTrans.nameError;
    this.emailError = langTrans.emailError;
  }

  private translations: {} = {
    english: {
      namePlaceholder: 'Full name',
      emailPlaceholder: 'Email address',
      notesPlaceholder: 'Notes',
      submitButtonValue: 'Submit',
      nameHint: '(You or your company\'s name)',
      nameError: 'Missing name',
      emailError: 'Missing or invalid email'
    },
    japanese: {
      namePlaceholder: 'お名前',
      emailPlaceholder: 'メール',
      notesPlaceholder: 'ノート',
      submitButtonValue:　'ゴー',
      nameHint: 'お前か会社の名前',
      nameError: '名前ねーっし',
      emailError: 'メールないかメールめちゃくちゃだ'
    }
  }

}
