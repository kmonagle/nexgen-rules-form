import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
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

    const config = cs.getConfig();
    config.form.buttons.forEach((buttonConfig: ButtonConfig) => {
      const button = new Button(buttonConfig, this, fs);
      this._buttons.push(button);
    });

    fs.filters.pipe(
      filter(val => !!val),
      tap(filters => {
        const facts = getFacts(filters!);
        const promises:Promise<any>[] = [];

        this._buttons.forEach(button => {
          if(button.config.enabledRules!.length > 0){
            const rules = button.config.enabledRules![0];
            promises.push(runRules(rules, facts).then(result => {
              button.enabled = result;
            }))
          } else {
            button.enabled = true;
          }
          if(button.config.visibleRules!.length > 0){
            const rules = button.config.visibleRules![0];
            promises.push(runRules(rules, facts).then(result => {
              button.visible = result;
            }))
          } else {
            button.visible = true;
          }
        });
        Promise.all(promises).then(() => this._buttonSubject.next(this._buttons));
      })
    ).subscribe();
  }
}
