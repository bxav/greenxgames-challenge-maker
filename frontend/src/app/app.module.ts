import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserPage } from "../pages/user/user";
import { ThingPage } from "../pages/thing/thing";
import {RestangularConfigFactory} from "./core/RestangularConfigFactory";
import {RestangularModule} from "ngx-restangular";
import {ChallengesService, ThingsService} from "./core/challenge-maker";

export function createRestangularConfigFactory(RestangularProvider) {
  return RestangularConfigFactory(RestangularProvider, { baseUrl: 'http://localhost:8080' });
}


@NgModule({
  declarations: [
    MyApp,
    UserPage,
    TabsPage,
    ThingPage
  ],
  imports: [
    BrowserModule,
    RestangularModule.forRoot([], createRestangularConfigFactory),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserPage,
    TabsPage,
    ThingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ThingsService,
    ChallengesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
