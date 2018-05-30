import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { TranslateService } from "@ngx-translate/core";

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = TabsPage;
    public footerData: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, androidPermissions: AndroidPermissions, public translateService: TranslateService) {
        const lang = navigator.language.split("-")[0];
    platform.ready().then(() => {
      statusBar.styleDefault();
        splashScreen.hide();
        translateService.setDefaultLang(lang);
        translateService.use(lang);
      let permissions = [
        androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
        androidPermissions.PERMISSION.CAMERA
      ];

      permissions.forEach((p) => {
        androidPermissions.checkPermission(p).then((status) => {
          if(!status.hasPermission){
            androidPermissions.requestPermission(p);
          }
        }).catch((err) => {
          androidPermissions.requestPermission(p);
        });
      });
    });

  }

}
