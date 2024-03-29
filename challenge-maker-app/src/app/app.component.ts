import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AuthService} from "./auth/auth.service";
import {ThingListPage} from "../pages/thing-list/thing-list";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ThingListPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      auth.handleAuthentication();
    });
  }
}
