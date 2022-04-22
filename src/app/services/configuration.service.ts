import { Injectable } from '@angular/core';
import {config} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  getConfig(){
    (config.form.fields[1].enabledRules as any).push(this.haveValueRule(["report"])); //admin
    (config.form.fields[2].enabledRules as any).push(this.haveValueRule(["report", "administration"])); //district
    (config.form.fields[3].enabledRules as any).push(this.haveValueRule(["report", "administration", "district"])); //school
    (config.form.fields[4].enabledRules as any).push(this.haveValueRule(["report", "administration", "district", "school"])); //assessment
    (config.form.fields[1].load as any).push(this.haveValueRule(["report"])); //admin
    (config.form.fields[2].load as any).push(this.haveValueRule(["report", "administration"])); //district
    (config.form.fields[3].load as any).push(this.haveValueRule(["report", "administration", "district"])); //school
    (config.form.fields[4].load as any).push(this.haveValueRule(["report", "administration", "district", "school"])); //assessment

    (config.form.buttons[1].enabledRules as any).push(this.haveValueRule(["report"])); //school
    (config.form.buttons[2].enabledRules as any).push(this.haveValueRule(["report", "administration","district", "school", "assessment"])); //assessment
    // (config.form.fields[3].enabledRules as any).push(this.haveValueRule(["report", "administration", "district"])); //school
    // (config.form.fields[4].enabledRules as any).push(this.haveValueRule(["report", "administration", "district", "school"])); //assessment

    return config;
  }

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
