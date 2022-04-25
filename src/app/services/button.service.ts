import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs/index';
import {ConfigurationService} from './configuration.service';
import {Button} from '../model/Button';
import {FilterService} from './filter.service';
import {filter, take, tap} from 'rxjs/operators';
import {RulesService} from './rules.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private _buttonSubject = new BehaviorSubject<Button[] | null>(null);
  buttons = this._buttonSubject.asObservable();

  private _buttons: Button[] = [];

  constructor(cs: ConfigurationService, fs: FilterService, private rs: RulesService) {

    cs.buttons.pipe(
      filter(buttons => !!buttons),
      take(1),
      tap(buttons => this._buttons = buttons!),
      tap(() => this._buttonSubject.next(this._buttons))
    ).subscribe();

    fs.filters.pipe(
      filter(val => !!val),
      tap(() => {
        const obs:Observable<any>[] = [];

        this._buttons.forEach(button => {
          let rules = button.config.enabledRules![0];
          obs.push(this.rs.runRules(rules).pipe(
            tap(result => button.enabled = result)
          ));
          rules = button.config.visibleRules![0];
          obs.push(this.rs.runRules(rules).pipe(
            tap(result => button.visible = result)
          ));
        });
        combineLatest(obs).pipe(take(1)).subscribe(() => {
          this._buttonSubject.next(this._buttons);
        });
      })
    ).subscribe();
  }
}
