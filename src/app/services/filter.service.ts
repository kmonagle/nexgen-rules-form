import { Injectable } from '@angular/core';
import {FilterConfig} from '../model/interfaces';
import {tap, mergeMap, filter} from 'rxjs/operators';
import {config} from '../config/config';
import {Filter} from '../model/Filter';
import {Observable} from 'rxjs/index';
import {KeyValue} from '../app.component';
import {DatasourceService} from './datasource.service';
import {HandlerService} from './handler.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filters: Filter[] = [];

  constructor(private ds: DatasourceService, hs: HandlerService) {

    config.form.fields.forEach((filterConfig: FilterConfig, idx) => {
      this.filters.push(new Filter(filterConfig, idx, this));
    });

    this.filters.forEach(afilter => afilter.control.valueChanges.pipe(
      filter(val => val),
      tap((val) => console.log(`${afilter.name} changed to ${val}`)),
      tap((val) => console.log(`${afilter.name} config is ${JSON.stringify(afilter.config)}`)),
      tap(() => {
        this.filters.forEach(flt => flt.isCurrent = false);
        afilter.isCurrent = true;
      }),
      mergeMap(() => hs.getHandler(afilter.config.handler)(this)),
    ).subscribe());
  }

  loadApp(){
    // load data for the first field
    this.getDataSource(this.getFirst()).pipe(
      tap((data) => console.log('data from ts: ', data)),
      tap( data => this.getFirst().populate(data))
    ).subscribe();
  }

  getFormer(filter: Filter): Filter[]{
    return this.filters.slice(0,(filter.index + 1));
  }

  getLatter(filter: Filter): Filter[]{
    return this.filters.slice(filter.index + 1);
  }

  getNext(filter: Filter): Filter{
    return this.filters.slice(filter.index + 1)[0];
  }

  getFirst(){
    const first = this.filters.find(flt => flt.isFirst);
    if(!first){
      throw new Error()
    }
    return first;
  }

  getCurrent(){
    const current = this.filters.find(flt => flt.isCurrent);
    if(!current){
      throw new Error()
    }
    return current;
  }

  getDataSource(filter: Filter): Observable<KeyValue[]>{
    return this.ds.getDatasource(filter);
  }
}
