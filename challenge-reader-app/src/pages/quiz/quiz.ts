import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Challenge} from "../../app/core/challenge-maker/model";

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage implements OnInit{
  challenge: Challenge;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.challenge = this.navParams.data.challenge;
  }

  ngOnInit() {
  }

  questionSelected(question: any) {
    console.log(question);
  }
}
