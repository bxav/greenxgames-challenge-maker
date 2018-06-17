import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {ChallengesService} from "../../app/core/challenge-maker";
import {Challenge} from "../../app/core/challenge-maker/model";
import {QuizPage} from "../quiz/quiz";
import {AuthService} from "../../app/auth/auth.service";

@Component({
  selector: 'page-thing',
  templateUrl: 'thing.html'
})
export class ThingPage implements OnInit{
  challenges: Challenge[] = [];

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public challengesService: ChallengesService,
    public authService: AuthService
  ) {

  }

  ngOnInit() {
    let thingId = location.search.split('thing=')[1];
    console.log(thingId);
    this.loadEntities(thingId);
  }

  challengeSelected(challenge: Challenge) {

    if (challenge.type == 'quiz') {
      this.navCtrl.push(QuizPage, { challenge: challenge });
    } else {
      if (!this.authService.isAuthenticated()) {
        this.authService.login();
      } else {
        this.presentChallengeComfirm();
      }
    }
  }

  private presentChallengeComfirm() {
    let alert = this.alertCtrl.create({
      title: 'Acceptez le Defis',
      message: 'Cela vous engage a le respecter',
      buttons: [
        {
          text: 'Annuler',
          role: 'annuler',
          handler: () => {
            console.log('Annuler clicke');
          }
        },
        {
          text: 'Comfirmer',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }


  private loadEntities(thingId: string) {
    this.challengesService.getAll(undefined, {thing: thingId}).subscribe((challenges: Challenge[]) => {
      console.log(challenges);
      this.challenges = challenges;
    });
  }
}
