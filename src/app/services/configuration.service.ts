import { Injectable } from '@angular/core';
import {config} from '../config/config';
import {skip} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/index';
import {Filter} from '../model/Filter';
import {ButtonConfig, FilterConfig} from '../model/interfaces';
import {Button} from '../model/Button';

export interface Configuration {
  form: {
    buttons:ButtonConfig[],
    fields: FilterConfig[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private _configSubject = new BehaviorSubject<Configuration | null>(null);
  config = this._configSubject.asObservable();

  private _filterSubject = new BehaviorSubject<Filter[] | null>(null);
  filters = this._filterSubject.asObservable();

  private _buttonSubject = new BehaviorSubject<Button[] | null>(null);
  buttons = this._buttonSubject.asObservable();

  constructor() {
    const filters: Filter[] = [];
    const buttons: Button[] = [];
    config.form.fields.forEach((field, idx) => {
      filters.push(new Filter(field, idx));
    });
    this._filterSubject.next(filters);
    config.form.buttons.forEach((button) => {
      buttons.push(new Button(button));
    });
    this._buttonSubject.next(buttons);
  }
}
