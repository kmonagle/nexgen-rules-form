import { Injectable } from '@angular/core';
import {tap, filter, take, skip, mergeMap} from 'rxjs/operators';
import {Filter} from '../model/Filter';
import {BehaviorSubject, combineLatest, forkJoin, Observable} from 'rxjs/index';
import {DataService} from './data.service';
import {ConfigurationService} from './configuration.service';
import {getFacts, runRules} from '../helper/rules';
import {RulesService} from './rules.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _filterSubject = new BehaviorSubject<Filter[] | null>(null);
  filters = this._filterSubject.asObservable().pipe(skip(1));

  private _filterChangeSubject = new BehaviorSubject<Filter | null>(null);
  filterChange = this._filterChangeSubject.asObservable().pipe(skip(1));

  private _filters: Filter[] = [];

  constructor(private ds: DataService, cs: ConfigurationService, private rs: RulesService) {

    cs.filters.pipe(
      filter(filters => !! filters),
      tap(filters => console.log("got filters in filter: ", filters)),
      take(1),
      tap(filters => this._filters = filters!),
      tap(filters => {
        filters!.forEach(flt => {
          flt.control.valueChanges.pipe(
            filter(val => !!val),
            tap(() => this._filterChangeSubject.next(flt))
          ).subscribe();
        })
      }),
      tap(() => this._filterSubject.next(this._filters)),
      mergeMap(() => {
        // init first field
        return this.ds.getData(this.getFirst(), []).pipe(
          tap( data => this.getFirst().populate(data))
        );
      }),
      tap(() => {
        this.resetIsCurrent(this.getFirst()); //set first to current
        let obs: Observable<any>[] = this.runFilters(this.getFirst());
        console.log("obs: ", obs);
        combineLatest(obs).pipe(take(1)).subscribe((res) => {console.log("filter init res: ", res)}, () => {}, () => this._filterSubject.next(this._filters));
      })
    ).subscribe();

    // ongoing listener
    this.filterChange.pipe(
      tap(filter => {
        this.resetIsCurrent(filter!);
        let obs: Observable<any>[] = this.runFilters(filter!);
        combineLatest(obs).pipe(take(1)).subscribe(() => {}, () => {}, () => this._filterSubject.next(this._filters));
      }),
    ).subscribe();
  }

  getFormer(filter: Filter): Filter[]{
    return this._filters.slice(0,(filter.index));
  }

  getLatter(filter: Filter): Filter[]{
    return this._filters.slice(filter.index + 1);
  }

  getFirst(){
    const first = this._filters.find(flt => flt.isFirst);
    if(!first){
      throw new Error()
    }
    return first;
  }

  resetIsCurrent(filter: Filter){
    this._filters.forEach(filter => filter.isCurrent = false);
    filter!.isCurrent = true;
  }

  runFilters(filter: Filter): Observable<any>[]{
    const obs:Observable<any>[] = [];
    //const facts = getFacts(this._filters);

    let filters = this.getLatter(filter);

    filters.forEach((filter: Filter) => {

      filter.control.reset();
      filter.control.disable();

      if(filter.config.visibleRules!.length === 0){
        filter.visible = true;
      } else {
        //filter.visible = filter.config.visibleRules!.every(rule => this.getFilterByName(rule).control.value)
        const rules = filter.config.visibleRules![0];
        obs.push(this.rs.runRules(rules).pipe(
          //tap(result => console.log('visible result: ', result, filter)),
          tap((result:boolean) => filter.visible = result )
        ))
      }
      if(filter.config.enabledRules!.length === 0){
        filter.enabled = true;
      } else {
        const rules = filter.config.enabledRules![0];
        obs.push(this.rs.runRules(rules).pipe(
          //tap(result => console.log('enabled result: ', result, filter)),
          tap(result => {
            if(result && filter.control.disabled){
              filter.control.enable();
            }
          })
        ))
      }
      if(filter.config.loadRules! && filter.config.loadRules!.length >= 1){
        const rules = filter.config.loadRules![0];
        obs.push(this.rs.runRules(rules).pipe(
          tap(result => console.log('load result: ', result, filter)),
          tap(result => {
            if(result){
              this.ds.getData(filter, this.getFormer(filter)).pipe(
                //tap(data => console.log('load data: ', data)),
                tap(results => {
                  filter.populate(results);
                  if(results && results.length===1){
                    filter.control.setValue(results[0].key);
                  }
                })
              ).subscribe()
            }
          })
        ));
      }
      if(filter.config.labelRules! && filter.config.labelRules!.length >= 1){
        const rules = filter.config.labelRules!;
        console.log('label rules: ', rules);
        const ruleRuns = rules.map(rule => this.rs.runRules(rule));
        console.log('ruleRuns: ', ruleRuns);
        obs.push(combineLatest(ruleRuns).pipe(
          tap(runResults => console.log("label run results: ", runResults)),
          tap(runResults => {
            const idx = runResults.indexOf(true);
            filter.label = filter.config.label[idx];
          })
        ));
      }
    });
    return obs;
  }
}
