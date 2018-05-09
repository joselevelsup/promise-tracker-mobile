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
import { Geolocation } from "@ionic-native/geolocation";
import { Camera } from "@ionic-native/camera";
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

@NgModule({
  declarations: [
      MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      IonicModule.forRoot(MyApp),
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
      ApiService,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
