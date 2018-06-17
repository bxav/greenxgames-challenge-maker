import {AfterViewInit, Component} from '@angular/core';

import {App, NavController} from 'ionic-angular';
import {Thing} from "../../app/core/challenge-maker/model";
import {ThingsService} from "../../app/core/challenge-maker";
import {ThingPage} from "../thing/thing";

@Component({
  selector: 'page-thing-list',
  templateUrl: 'thing-list.html'
})
export class ThingListPage implements AfterViewInit {
  protected things: Array<Thing>;

  constructor(
    private app: App,
    private thingsService: ThingsService,
    public navCtrl: NavController
  ) {

  }

  ngAfterViewInit () {
    this.app.setTitle('Thing List');
    this.loadThings();
  }

  ionViewWillEnter() {
    console.log("Ionic View Will Enter");
    this.loadThings();
  }

  loadThings() {
    this.thingsService.getAll().subscribe((data: any) => {
      this.things = data;
    });
  }

  thingSelected(thing: Thing) {
    this.navCtrl.push(ThingPage, { thingId: thing.id });
  }

  createThing() {
    this.navCtrl.push(ThingPage);
  }
}
