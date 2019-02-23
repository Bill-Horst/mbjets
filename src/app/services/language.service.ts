import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  triggerLanguageChange = new Subject();

  // TODO: here we can set the language to the previous language set in the user's
  // browser via local storage get and set
  private language: string = 'english';

  constructor() { }

  setLanguage(language: string) {
    this.language = language;
    this.triggerLanguageChange.next(language);
  }

  getLanguage() {
    return this.language;
  }

}
