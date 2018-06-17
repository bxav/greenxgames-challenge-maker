import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Challenge } from './model';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChallengesService extends BackendService<Challenge> {
  protected get resource() { return Challenge._resource; }
  protected get class() { return Challenge; }
}
