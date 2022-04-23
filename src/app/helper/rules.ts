import {Engine} from 'json-rules-engine';
import {Filter} from '../model/Filter';

export function runRules(rules: any, facts: any): Promise<boolean>{
  if(!rules) return Promise.resolve(true);
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

export function getFacts(filters: Filter[]){
  const facts: any = {};
  filters.forEach(filter => facts[filter.name] = filter);
  return facts;
}
