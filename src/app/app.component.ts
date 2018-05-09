import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from "@ionic-native/android-permissions";

import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = TabsPage;
    public footerData: any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, androidPermissions: AndroidPermissions, public events: Events) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
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

    events.subscribe("footerData", (data) => {
      this.footerData = data;
    });

  }

}
