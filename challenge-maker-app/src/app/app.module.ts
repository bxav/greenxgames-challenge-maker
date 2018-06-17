import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RestangularConfigFactory} from "./core/RestangularConfigFactory";
import {RestangularModule} from "ngx-restangular";
import {ChallengesService, ThingsService} from "./core/challenge-maker";

import { environment } from '../environments/environment';
import {AuthService} from "./auth/auth.service";
import {ThingListPage} from "../pages/thing-list/thing-list";
import {TruncatePipe} from "../pipes/truncate.pipe";

export function createRestangularConfigFactory(RestangularProvider) {
  return RestangularConfigFactory(RestangularProvider, { baseUrl: environment.greenGameUrl });
}


@NgModule({
  declarations: [
    MyApp,
    ThingListPage,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    RestangularModule.forRoot([], createRestangularConfigFactory),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ThingListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ThingsService,
    ChallengesService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
