
import { Injectable } from '@angular/core';
import { NavController} from 'ionic-angular';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import {QuizPage} from "../../pages/quiz/quiz";
import {ThingPage} from "../../pages/thing/thing";

import { environment } from '../../environments/environment';

(window as any).global = window;

@Injectable()
export class AuthService {
  auth0: any;


  constructor(
  ) {

    let thing = location.search.split('thing=')[1];

    let redirectUrl = thing ? environment.auth0.redirectUri + '?thing=' + thing : environment.auth0.redirectUri;
    this.auth0 = new auth0.WebAuth({
      clientID: environment.auth0.clientID,
      domain: environment.auth0.domain,
      responseType: 'token id_token',
      audience: environment.auth0.audience,
      redirectUri: redirectUrl,
      scope: 'openid'
    });
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}
