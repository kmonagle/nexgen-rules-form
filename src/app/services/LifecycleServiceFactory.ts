import {take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {of} from 'rxjs/internal/observable/of';
import {FilterService} from './filter.service';
import {Filter} from '../model/Filter';
import {LifecycleData} from '../model/interfaces';

const getDefault = (fs: FilterService): LifecycleData => {

  return {
    clearFields: (): Observable<any> => {
      const latterFields: Filter[] = fs.getLatter(fs.getCurrent());
      latterFields.forEach(latterField => latterField.control.reset());
      return of(true);
    },

    disableFields: (): Observable<any> => {
      const latterFields: Filter[] = fs.getLatter(fs.getCurrent());
      latterFields.forEach(latterField => latterField.control.disable());
      return of(true);
    },

    loadData: ():Observable<any> => {
      const next:Filter = fs.getNext(fs.getCurrent());

      if(next){
        return fs.getDataSource(next).pipe(
          take(1),
          tap((data) => console.log('data from ts: ', data)),
          tap( data => next.populate(data))
        )
      } else {
        return of(null);
      }
    },

    handleSpecialCounts: ():Observable<any> => {
      const next:Filter = fs.getNext(fs.getCurrent());

      if(next){
        return next.dataStream.pipe(
          take(1),
          tap((vals) => console.log('special count vals: ', vals)),
          tap((vals) => {
            if(vals && vals.length > 0){
              next.control.enable();
            }
            if(vals && vals.length === 1){
              next.control.setValue(vals[0].key);
            }
          })
        );
      } else {
        return of(null);
      }
    }
  }
};

export const getLifeCycle = (fs: FilterService, id?: string): LifecycleData => {
  const defaultLC = getDefault(fs);
  if(id === 'alternative'){
    return {
      clearFields: defaultLC.clearFields,
      disableFields: defaultLC.disableFields,
      loadData: () => {console.log("IN ALTERNATIVE DATA!!!!"); return defaultLC.loadData()},
      handleSpecialCounts: defaultLC.handleSpecialCounts,
    }
  }
  return defaultLC;
};
