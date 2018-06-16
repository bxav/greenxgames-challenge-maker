import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChallengesService} from "../../app/core/challenge-maker";
import {Challenge} from "../../app/core/challenge-maker/model";

@Component({
  selector: 'page-thing',
  templateUrl: 'thing.html'
})
export class ThingPage implements OnInit{
  challenges: Challenge[] = [];

  constructor(
    public navCtrl: NavController,
    public challengesService: ChallengesService
  ) {

  }

  ngOnInit() {
    this.loadEntities();
  }

  private loadEntities() {
    this.challengesService.getAll().subscribe((challenges: Challenge[]) => {
      console.log(challenges);
      this.challenges = challenges;
    });
  }
}
