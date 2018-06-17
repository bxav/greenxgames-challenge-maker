import {AfterViewInit, Component} from '@angular/core';

import {App, NavController, NavParams} from 'ionic-angular';
import {Challenge} from "../../app/core/challenge-maker/model";
import {ChallengesService} from "../../app/core/challenge-maker";

@Component({
  selector: 'page-challenge-list',
  templateUrl: 'challenge-list.html'
})
export class ChallengeListPage implements AfterViewInit {
  protected challenges: Array<Challenge>;

  constructor(
    private app: App,
    private challengesService: ChallengesService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ngAfterViewInit () {
    this.app.setTitle('Challenge List');
    this.loadChallenges();
  }

  ionViewWillEnter() {
    console.log("Ionic View Will Enter");
    this.loadChallenges();
  }

  loadChallenges() {
    this.challengesService.getAll(undefined, {thing: this.navParams.data.thingId}).subscribe((data: any) => {
      this.challenges = data;
    });
  }

  challengeSelected(challenge: Challenge) {
    //this.navCtrl.push(ChallengePage, { challengeId: challenge.id });
  }

  createChallenge() {
    //this.navCtrl.push(ChallengePage);
  }
}
