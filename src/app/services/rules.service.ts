import { Injectable } from '@angular/core';
import {Engine, EngineResult} from 'json-rules-engine';
import {Filter} from '../model/Filter';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor() {}

  runRules(rules: any, facts: any): Promise<boolean>{
    const engine: Engine = new Engine();
    engine.addOperator('exists', (factValue: string[]) => {
      if (!factValue || !factValue.length) return false;
      return !!factValue[0].toLowerCase();
    });
    engine.addRule(rules);
    return engine.run(facts).then((res) => {
      return res.events.length >= 1;
    })
  }

  getFacts(filters: Filter[]){
    const facts: any = {};
    filters.forEach(filter => facts[filter.name] = filter);
    return facts;
  }


}
