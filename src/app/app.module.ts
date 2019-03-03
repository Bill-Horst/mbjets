import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { WorkComponent } from './work/work.component';
import { RatesComponent } from './rates/rates.component';
import { GeneralComponent } from './rates/general/general.component';
import { TechnicalComponent } from './rates/technical/technical.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { LanguageService } from './services/language.service';
import { LogicService } from './services/logic.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContactComponent,
    AboutComponent,
    SidenavListComponent,
    WorkComponent,
    RatesComponent,
    GeneralComponent,
    TechnicalComponent,
    ThankyouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [LanguageService, LogicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
