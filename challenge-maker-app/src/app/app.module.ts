import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RestangularConfigFactory} from "./core/RestangularConfigFactory";
import {RestangularModule} from "ngx-restangular";
import {ChallengesService, ThingsService} from "./core/challenge-maker";

import {Ndef, NFC} from "@ionic-native/nfc";

import { environment } from '../environments/environment';
import {AuthService} from "./auth/auth.service";
import {ThingListPage} from "../pages/thing-list/thing-list";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {ThingPage} from "../pages/thing/thing";
import {TagWriteNfcModalPage} from "../pages/thing/tag-write-nfc-modal";
import {ChallengeListPage} from "../pages/challenge-list/challenge-list";

export function createRestangularConfigFactory(RestangularProvider) {
  return RestangularConfigFactory(RestangularProvider, { baseUrl: environment.greenGameUrl });
}

@NgModule({
  declarations: [
    MyApp,
    ThingListPage,
    ThingPage,
    TagWriteNfcModalPage,
    ChallengeListPage,
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
    ThingListPage,
    ThingPage,
    TagWriteNfcModalPage,
    ChallengeListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ThingsService,
    ChallengesService,
    ChallengeListPage,
    AuthService,
    NFC,
    Ndef,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
