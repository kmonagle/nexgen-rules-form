import {FilterService} from '../services/filter.service';
import {Filter} from '../model/Filter';
import {take, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs/internal/Observable';
import {KeyValue} from '../app.component';

const clear = (fs: FilterService) => {
  const latterFields: Filter[] = fs.getLatter(fs.getCurrent());
  latterFields.forEach(latterField => latterField.control.reset());
};

const disable = (fs: FilterService) => {
  const latterFields: Filter[] = fs.getLatter(fs.getCurrent());
  latterFields.forEach(latterField => latterField.control.disable());
};

const clearAndDisable = (fs: FilterService) => {
  clear(fs);
  disable(fs);
};

const loadNext = (fs: FilterService) => {
  const next:Filter = fs.getNext(fs.getCurrent());
  if(next){
    return fs.getDataSource(next).pipe(
      take(1),
      tap((data) => console.log('data from ts: ', data)),
      tap( data => next.populate(data)),
      tap((vals) => {
        if(vals && vals.length > 0){
          next.control.enable();
        }
        if(vals && vals.length === 1){
          next.control.setValue(vals[0].key);
        }
      })
    )
  } else {
    return of(null);
  }
};

//handlers have to return an Observable
const defaultHandler = (fs: FilterService) => {
  console.log("running defaultHandler");
  clearAndDisable(fs);
  return loadNext(fs);
};

const altHandler = (fs: FilterService) => {
  console.log("running altHandler");
  clearAndDisable(fs);
  return loadNext(fs);
};

const WIDA_school = (fs: FilterService) => {
  console.log("running WIDA_school");
  clearAndDisable(fs);
  return (<Observable<any>>loadNext(fs)).pipe(tap(val => {
    fs.getFilterByName("assessment").visible=true;
    fs.getFilterByName("assessment").control.enable();
    fs.publishFilters();
  }));
};

const handlers = new Map<string, (fs: FilterService) => Observable<KeyValue[]> | Observable<null>>();
handlers.set("alt", altHandler);
handlers.set("default", defaultHandler);
handlers.set("WIDA_school", WIDA_school);

export function getHandler(id:string = "default"): (fs: FilterService) => Observable<KeyValue[]> | Observable<null>{
  return handlers.get(id)!;
}
