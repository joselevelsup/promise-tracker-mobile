import { BrowserModule } from '@angular/platform-browser';
import {
  ErrorHandler,
  NgModule
} from '@angular/core';
import {
  IonicApp,
  IonicErrorHandler,
  IonicModule
} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from "@ionic-native/sqlite";
import { IonicStorageModule } from "@ionic/storage";

import ApiService from "../api/api";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage,  } from "../pages/about/about";

@NgModule({
  declarations: [
    MyApp,
      HomePage,
      AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      HomePage,
      AboutPage
  ],
  providers: [
    StatusBar,
      SplashScreen,
      SQLite,
    ApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
