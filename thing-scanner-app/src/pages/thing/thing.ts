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
    let thingId = location.search.split('thing=')[1];
    console.log(thingId);
    this.loadEntities(thingId);
  }

  private loadEntities(thingId: string) {
    this.challengesService.getAll(undefined, {thing: thingId}).subscribe((challenges: Challenge[]) => {
      console.log(challenges);
      this.challenges = challenges;
    });
  }
}
