import {Engine} from 'json-rules-engine';
import {Filter} from '../model/Filter';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs/internal/Observable';
import {from} from 'rxjs/internal/observable/from';

export function runRules(rules: any, facts: any): Observable<boolean>{
  if(!rules) return of(true)
  const engine: Engine = new Engine();
  engine.addOperator('exists', (factValue: string[]) => {
    if (!factValue || !factValue.length) return false;
    return !!factValue[0].toLowerCase();
  });
  engine.addRule(rules);
  return from(engine.run(facts).then((res) => {
    return res.events.length >= 1;
  }));
}

export function getFacts(filters: Filter[]){
  const facts: any = {};
  filters.forEach(filter => facts[filter.name] = filter);
  return facts;
}
