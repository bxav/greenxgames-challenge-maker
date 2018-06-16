import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Thing } from './model';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThingsService extends BackendService<Thing> {
  protected get resource() { return Thing._resource; }
  protected get class() { return Thing; }
}
