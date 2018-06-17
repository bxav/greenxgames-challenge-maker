import { Component } from '@angular/core';

import {App, ModalController, NavController, NavParams} from 'ionic-angular';
import {TagWriteNfcModalPage} from "./tag-write-nfc-modal";
import {ThingsService} from "../../app/core/challenge-maker";
import {Thing} from "../../app/core/challenge-maker/model";
import {ChallengeListPage} from "../challenge-list/challenge-list";

@Component({
  selector: 'page-thing',
  templateUrl: 'thing.html'
})
export class ThingPage {
  protected thing: Thing;
  protected mode: string = 'new';

  constructor(
    private app: App,
    private thingManager: ThingsService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    this.thing = new Thing();
    this.app.setTitle('Create Thing');
    if (this.navParams.data.thingId) {
      this.mode = 'update';
      this.thingManager
        .get(this.navParams.data.thingId)
        .subscribe((thing) => {
          this.thing = thing;
          console.log(thing);
        });
    } else {
      this.mode = 'new';
    }
  }

  openChallengeList() {
    this.navCtrl.push(ChallengeListPage, { thingId: this.thing.id });
  }

  openCreateTag(){

    let subcription = this.mode == 'new' ? this.thingManager.add(this.thing) :  this.thingManager.get(this.thing.id);

    subcription.subscribe((thing) => {
      console.log(thing);

      let modal = this.modalCtrl.create(TagWriteNfcModalPage, {
        url: "https://prod-eu-thing-scanner-99-app.azurewebsites.net/?thing="+thing.id
      });

      modal.present().then((params) => {


        console.log(this.thing);
        if (params.goToActionList) {
          //this.navCtrl.push(ThingActionListPage, { thingId: this.thing.id });
        } else {
          this.navCtrl.pop();
        }
      });
    });

  }
}
