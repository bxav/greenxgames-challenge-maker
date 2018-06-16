import { Component } from '@angular/core';
import { UserPage } from "../user/user";
import {ThingPage} from "../thing/thing";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ThingPage;
  tab2Root = UserPage;

  constructor() {

  }
}
