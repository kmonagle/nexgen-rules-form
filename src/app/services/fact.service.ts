import { Injectable } from '@angular/core';
import {ConfigurationService} from './configuration.service';
import {BehaviorSubject, combineLatest, forkJoin} from 'rxjs/index';
import {tap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FactService {

  private _factSubject = new BehaviorSubject<Record<string, any> | null>(null);
  fact = this._factSubject.asObservable();

  constructor(private cs: ConfigurationService, private us: UserService) {

    const fact:Record<string, any> = {};
    combineLatest([cs.filters, us.user]).pipe(
      tap(res => console.log("got res in fact: ", res)),
      tap(res => {
        const filters = res[0];
        const user = res[1];
        filters!.forEach(filter => fact[filter.name] = filter);
        fact.user = user;
      }),
      tap(() => this._factSubject.next(fact))
    ).subscribe();

  }
}
