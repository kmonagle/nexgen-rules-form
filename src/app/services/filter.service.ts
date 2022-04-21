import { Injectable } from '@angular/core';
import {FilterConfig} from '../model/interfaces';
import {tap, mergeMap, filter} from 'rxjs/operators';
import {config} from '../config/config';
import {Filter} from '../model/Filter';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {KeyValue} from '../app.component';
import {DatasourceService} from './datasource.service';
import {HandlerService} from './handler.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _filterSubject = new BehaviorSubject<Filter[] | null>(null);
  filters = this._filterSubject.asObservable();

  private _filters: Filter[] = [];

  constructor(private ds: DatasourceService, hs: HandlerService) {

    config.form.fields.forEach((filterConfig: FilterConfig, idx) => {
      this._filters.push(new Filter(filterConfig, idx, this));
    });

    this._filters.forEach(afilter => afilter.control.valueChanges.pipe(
      filter(val => val),
      tap((val) => console.log(`${afilter.name} changed to ${val}`)),
      tap((val) => console.log(`${afilter.name} config is ${JSON.stringify(afilter.config)}`)),
      tap(() => {
        this._filters.forEach(flt => flt.isCurrent = false);
        afilter.isCurrent = true;
      }),
      mergeMap(() => hs.getHandler(afilter.config.handler)(this)),
    ).subscribe());

    this._filterSubject.next(this._filters);
  }

  loadApp(){
    // load data for the first filter
    this.getDataSource(this.getFirst()).pipe(
      tap((data) => console.log('data from ts: ', data)),
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
    return latter.find(lat => lat.visible)!;
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
}
