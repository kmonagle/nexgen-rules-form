import { Injectable } from '@angular/core';
import {FactService} from './fact.service';
import {Observable} from 'rxjs/internal/Observable';
import {Engine, TopLevelCondition} from 'json-rules-engine';
import {of} from 'rxjs/internal/observable/of';
import {from} from 'rxjs/internal/observable/from';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {throwError} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private fs: FactService) {
    //fs.fact.subscribe(fact => console.log("got fact: ", fact));
  }

  runRules(conditions: TopLevelCondition): Observable<boolean>{
    if(!conditions) return of(true)
    const engine: Engine = new Engine();
    engine.addOperator('exists', (factValue: string[]) => {
      if (!factValue || !factValue.length) return false;
      return !!factValue[0].toLowerCase();
    });
    engine.addRule(this.getRule(conditions));
    return this.fs.fact.pipe(
      mergeMap((facts) => from(engine.run(facts!).then((res) => {
        return res.events.length >= 1;
      }))),
      map(res => res),
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  getRule(conditions: TopLevelCondition){
    return {
      conditions: conditions,
      event: {  // define the event to fire when the conditions evaluate truthy
        type: 'haveValue',
        params: {
          message: 'Report has a value!'
        }
      }
    }
  }
}
