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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SQLite } from "@ionic-native/sqlite";
import { Geolocation } from "@ionic-native/geolocation";
import { Camera } from "@ionic-native/camera";
import { GoogleMaps } from "@ionic-native/google-maps";
import { IonicStorageModule } from "@ionic/storage";
import { AndroidPermissions } from "@ionic-native/android-permissions";


import ApiService from "../api/api";

import { MyApp } from './app.component';
import { TabsPage } from "../pages/tabs/tabs";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { HomePage } from '../pages/home/home';
import { HomePageModule } from '../pages/home/home.module';
import { AboutPage } from "../pages/about/about";
import { AboutPageModule } from "../pages/about/about.module";
import { NewCampaignModalPage } from "../pages/new-campaign-modal/new-campaign-modal";
import { NewCampaignModalPageModule } from "../pages/new-campaign-modal/new-campaign-modal.module";

import {
    SurveyBegin,
    SurveyBeginModule,
    SurveyDetailPage,
    SurveyDetailPageModule,
    SurveyEnd,
    SurveyEndModule
} from "../pages/survey";

export function createTranslateFactory(http: HttpClient){
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
      MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      IonicModule.forRoot(MyApp, {
          scrollAssist: false
      }),
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateFactory),
              deps: [HttpClient]
          }
      }),
      IonicStorageModule.forRoot(),
      HomePageModule,
      NewCampaignModalPageModule,
      AboutPageModule,
      TabsPageModule,
      SurveyBeginModule,
      SurveyDetailPageModule,
      SurveyEndModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      TabsPage,
      HomePage,
      NewCampaignModalPage,
      AboutPage,
      SurveyBegin,
      SurveyDetailPage,
      SurveyEnd
  ],
  providers: [
    StatusBar,
      SplashScreen,
      SQLite,
      Geolocation,
      AndroidPermissions,
      Camera,
      GoogleMaps,
      ApiService,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
