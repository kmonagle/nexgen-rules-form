import { Injectable } from '@angular/core';
import {FactService} from './fact.service';
import {Observable} from 'rxjs/internal/Observable';
import {Engine} from 'json-rules-engine';
import {of} from 'rxjs/internal/observable/of';
import {from} from 'rxjs/internal/observable/from';
import {map, mergeMap, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, forkJoin} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private fs: FactService) {
    //fs.fact.subscribe(fact => console.log("got fact: ", fact));
  }

  runRules(rules: any): Observable<boolean>{
    if(!rules) return of(true)
    const engine: Engine = new Engine();
    engine.addOperator('exists', (factValue: string[]) => {
      if (!factValue || !factValue.length) return false;
      return !!factValue[0].toLowerCase();
    });
    engine.addRule(rules);
    return this.fs.fact.pipe(
      mergeMap((facts) => from(engine.run(facts!).then((res) => {
        console.log("n merge map: ", res);
        return res.events.length >= 1;
      }))),
      map(res => res)
    );
  }
}
