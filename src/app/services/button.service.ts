import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, forkJoin, Observable} from 'rxjs/index';
import {ButtonConfig} from '../model/interfaces';
import {ConfigurationService} from './configuration.service';
import {Button} from '../model/Button';
import {FilterService} from './filter.service';
import {filter, tap} from 'rxjs/operators';
import {getFacts, runRules} from '../helper/rules';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private _buttonSubject = new BehaviorSubject<Button[] | null>(null);
  buttons = this._buttonSubject.asObservable();

  private _buttons: Button[] = [];

  constructor(cs: ConfigurationService, fs: FilterService) {

    cs.config.pipe(
      tap(config => {
        config!.form.buttons.forEach((buttonConfig: ButtonConfig) => {
          const button = new Button(buttonConfig, this, fs);
          this._buttons.push(button);
        });
      })
    ).subscribe();

    fs.filters.pipe(
      filter(val => !!val),
      tap(filters => {
        const facts = getFacts(filters!);
        const obs:Observable<any>[] = [];

        this._buttons.forEach(button => {
          let rules = button.config.enabledRules![0];
          obs.push(runRules(rules, facts).pipe(
            tap(result => button.enabled = result)
          ));
          rules = button.config.visibleRules![0];
          obs.push(runRules(rules, facts).pipe(
            tap(result => button.visible = result)
          ));
        });
        forkJoin(obs).subscribe(res => {
          this._buttonSubject.next(this._buttons);
        });
      })
    ).subscribe();
  }
}
