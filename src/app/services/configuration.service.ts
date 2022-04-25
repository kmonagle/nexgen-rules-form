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
    (config.form.fields[1].enabledRules as any).push(this.haveValueRule(["report"])); //admin
    (config.form.fields[1].visibleRules as any).push(this.haveValueRule(["report"])); //admin
    (config.form.fields[1].load as any).push(this.haveValueRule(["report"])); //admin

    (config.form.fields[2].enabledRules as any).push(this.haveValueRule(["report", "view"])); //district
    (config.form.fields[2].visibleRules as any).push(this.haveValueRule(["report", "view"])); //district
    (config.form.fields[2].load as any).push(this.haveValueRule(["report", "view"])); //admin

    (config.form.buttons[0].enabledRules as any).push(this.haveValueRule(["report", "view", "criteria"])); //school
    (config.form.buttons[0].visibleRules as any).push(this.haveValueRule(["report", "view", "criteria"])); //school

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


    this._configSubject.next(config);
  }

  // getConfig(){
  //   (config.form.fields[1].enabledRules as any).push(this.haveValueRule(["report"])); //admin
  //   (config.form.fields[2].enabledRules as any).push(this.haveValueRule(["report", "administration"])); //district
  //   (config.form.fields[3].enabledRules as any).push(this.haveValueRule(["report", "administration", "district"])); //school
  //   (config.form.fields[4].enabledRules as any).push(this.haveValueRule(["report", "administration", "district", "school"])); //assessment
  //   (config.form.fields[1].load as any).push(this.haveValueRule(["report"])); //admin
  //   (config.form.fields[2].load as any).push(this.haveValueRule(["report", "administration"])); //district
  //   (config.form.fields[3].load as any).push(this.haveValueRule(["report", "administration", "district"])); //school
  //   (config.form.fields[4].load as any).push(this.haveValueRule(["report", "administration", "district", "school"])); //assessment
  //
  //   (config.form.buttons[1].enabledRules as any).push(this.haveValueRule(["report"])); //school
  //   (config.form.buttons[2].enabledRules as any).push(this.haveValueRule(["report", "administration","district", "school", "assessment"])); //assessment
  //   (config.form.buttons[2].visibleRules as any).push(this.haveValueRule(["report", "administration","district", "school", "assessment"])); //assessment
  //   // (config.form.fields[3].enabledRules as any).push(this.haveValueRule(["report", "administration", "district"])); //school
  //   // (config.form.fields[4].enabledRules as any).push(this.haveValueRule(["report", "administration", "district", "school"])); //assessment
  //
  //   return config;
  // }

  haveValueRule(names: string[]){
    return {
      conditions: {
        all: names.map(name => this.getExistsCondition(name))
      },
      event: {  // define the event to fire when the conditions evaluate truthy
        type: 'haveValue',
        params: {
          message: 'Report has a value!'
        }
      }
    }
  }

  getExistsCondition(name: string){
    return {
      fact: name,
      operator: 'exists',
      value: '',
      path: '$.control.value'
    }
  }
}
