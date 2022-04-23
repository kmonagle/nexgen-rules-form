import { Injectable } from '@angular/core';
import {FilterConfig} from '../model/interfaces';
import {tap, filter, take} from 'rxjs/operators';
import {Filter} from '../model/Filter';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {KeyValue} from '../app.component';
import {DatasourceService} from './datasource.service';
import {ConfigurationService} from './configuration.service';
import {getFacts, runRules} from '../helper/rules';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _filterSubject = new BehaviorSubject<Filter[] | null>(null);
  filters = this._filterSubject.asObservable();

  private _filterChangeSubject = new BehaviorSubject<Filter | null>(null);
  filterChange = this._filterChangeSubject.asObservable();

  private _filters: Filter[] = [];

  constructor(private ds: DatasourceService, cs: ConfigurationService) {

    // we want to run the filters through the rules the first time the filters are set up...we do that here(happens once!)
    this.filters.pipe(
      filter(filters => !!filters),
      take(1),
      tap(filters => {
        let promises: Promise<any>[] = [];
        filters!.slice(1).forEach(filter => {
          filter.control.reset();
          filter.control.disable();
          promises.concat(this.runFilters(filter));
        });
        Promise.all(promises).finally(() => this._filterSubject.next(this._filters));
      })
    ).subscribe();

    this.filterChange.pipe(
      filter(filter => !!filter),
      tap(filter => {
        this.resetIsCurrent(filter!);
        // we'll be gathering a bunch of promises potentially depending on config
        let promises: Promise<any>[] = [];
        const latter = this.getLatter(filter!);
        latter.forEach(filter => {
          filter.control.reset();
          filter.control.disable();
          promises.concat(this.runFilters(filter));
        });
        Promise.all(promises).finally(() => this._filterSubject.next(this._filters));
      }),
    ).subscribe();

    const config = cs.getConfig();

    config.form.fields.forEach((filterConfig: FilterConfig, idx) => {
      const filter2 = new Filter(filterConfig, idx, this);
      this._filters.push(filter2);
      filter2.control.valueChanges.pipe(
        filter(val => !!val),
        tap(() => this._filterChangeSubject.next(filter2))
      ).subscribe();
    });

    this._filterSubject.next(this._filters);
  }

  loadApp(){

    // load data for the first filter
    this.getDataSource(this.getFirst()).pipe(
      tap( data => this.getFirst().populate(data))
    ).subscribe();
  }

  getFormer(filter: Filter): Filter[]{
    return this._filters.slice(0,(filter.index + 1));
  }

  getLatter(filter: Filter): Filter[]{
    return this._filters.slice(filter.index + 1);
  }

  getNext(filter: Filter): Filter{
    const latter = this.getLatter(filter);
    return latter[0];
  }

  getFirst(){
    const first = this._filters.find(flt => flt.isFirst);
    if(!first){
      throw new Error()
    }
    return first;
  }

  getCurrent(){
    const current = this._filters.find(flt => flt.isCurrent);
    if(!current){
      throw new Error()
    }
    return current;
  }

  getFilterByName(name: string): Filter{
    return this._filters.find(f => f.name === name)!;
  }

  publishFilters(){
    this._filterSubject.next(this._filters);
  }

  getDataSource(filter: Filter): Observable<KeyValue[]>{
    return this.ds.getDatasource(filter);
  }

  resetIsCurrent(filter: Filter){
    this._filters.forEach(filter => filter.isCurrent = false);
    filter!.isCurrent = true;
  }

  runFilters(filter: Filter): Promise<any>[]{
    const promises = [];
    const facts = getFacts(this._filters);
    if(filter.config.visibleRules!.length === 0){
      filter.visible = true;
    } else {
      //filter.visible = filter.config.visibleRules!.every(rule => this.getFilterByName(rule).control.value)
      const rules = filter.config.visibleRules![0];
      promises.push(runRules(rules,facts).then(result => {
        filter.visible = result;
      }))
    }
    if(filter.config.enabledRules!.length === 0){
      filter.enabled = true;
    } else {
      const rules = filter.config.enabledRules![0];
      promises.push(runRules(rules,facts).then(result => {
        if(result && filter.control.disabled){
          filter.control.enable();
        }
      }))
    }
    if(filter.config.load! && filter.config.load!.length >= 1){
      const rules = filter.config.load![0];
      runRules(rules,facts).then(result => {
        if(result){
          promises.push(this.getDataSource(filter).pipe(
            tap(results => {
              filter.populate(results);
              if(results && results.length===1){
                filter.control.setValue(results[0].key);
              }
            })
          ).toPromise())
        }
      });
    }
    return promises;
  }
}
