import { Injectable } from '@angular/core';
import {FilterConfig} from '../model/interfaces';
import {tap, filter, take, skip, mergeMap} from 'rxjs/operators';
import {Filter} from '../model/Filter';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs/index';
import {KeyValue} from '../app.component';
import {DataService} from './data.service';
import {ConfigurationService} from './configuration.service';
import {getFacts, runRules} from '../helper/rules';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _filterSubject = new BehaviorSubject<Filter[] | null>(null);
  filters = this._filterSubject.asObservable().pipe(skip(1));

  private _filterChangeSubject = new BehaviorSubject<Filter | null>(null);
  filterChange = this._filterChangeSubject.asObservable().pipe(skip(1));

  private _filters: Filter[] = [];

  constructor(private ds: DataService, cs: ConfigurationService) {

    // init, create filters, wire up listeners, load first field, do the initial rule run
    cs.config.pipe(
      take(1), //do it once!!
      tap(config => {
        config!.form.fields.forEach((filterConfig: FilterConfig, idx:number) => {
          const filter2 = new Filter(filterConfig, idx, this);
          this._filters.push(filter2);
          filter2.control.valueChanges.pipe(
            filter(val => !!val),
            tap(() => this._filterChangeSubject.next(filter2))
          ).subscribe();
        });
        this._filterSubject.next(this._filters);
      }),
      mergeMap(() => {
        // init first field
        return this.getDataSource(this.getFirst()).pipe(
          tap( data => this.getFirst().populate(data))
        );
      }),
      tap(() => {
        this.resetIsCurrent(this.getFirst()); //set first to current
        let obs: Observable<any>[] = this.runFilters(this.getFirst());
        forkJoin(obs).subscribe(() => {}, () => {}, () => this._filterSubject.next(this._filters));
      })
    ).subscribe();

    // ongoing listener
    this.filterChange.pipe(
      tap(filter => {
        this.resetIsCurrent(filter!);
        let obs: Observable<any>[] = this.runFilters(filter!);
        forkJoin(obs).subscribe(() => {}, () => {}, () => this._filterSubject.next(this._filters));
      }),
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

  getDataSource(filter: Filter): Observable<KeyValue[]>{
    return this.ds.getDatasource(filter);
  }

  resetIsCurrent(filter: Filter){
    this._filters.forEach(filter => filter.isCurrent = false);
    filter!.isCurrent = true;
  }

  runFilters(filter: Filter): Observable<any>[]{
    const obs:Observable<any>[] = [];
    const facts = getFacts(this._filters);

    let filters = this.getLatter(filter);

    filters.forEach((filter: Filter) => {

      filter.control.reset();
      filter.control.disable();

      if(filter.config.visibleRules!.length === 0){
        filter.visible = true;
      } else {
        //filter.visible = filter.config.visibleRules!.every(rule => this.getFilterByName(rule).control.value)
        const rules = filter.config.visibleRules![0];
        obs.push(runRules(rules,facts).pipe(
          tap((result:boolean) => filter.visible = result )
        ))
      }
      if(filter.config.enabledRules!.length === 0){
        filter.enabled = true;
      } else {
        const rules = filter.config.enabledRules![0];
        obs.push(runRules(rules,facts).pipe(
          tap(result => {
            if(result && filter.control.disabled){
              filter.control.enable();
            }
          })
        ))
      }
      if(filter.config.load! && filter.config.load!.length >= 1){
        const rules = filter.config.load![0];
        obs.push(runRules(rules,facts).pipe(
          //tap(result => console.log('load result: ', result, filter)),
          tap(result => {
            if(result){
              this.getDataSource(filter).pipe(
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
    });
    return obs;
  }
}
