import {FilterService} from '../services/filter.service';
import {Filter} from '../model/Filter';
import {take, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

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

const handlers = {
  altHandler,
  defaultHandler
};

export function getHandler(id?: string): any{
  if(!id){
    return defaultHandler;
  } else if(id === 'altHandler') {
    return altHandler;
  }
}
