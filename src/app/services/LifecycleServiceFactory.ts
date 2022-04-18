import {ContextService} from './context.service';
import {take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {of} from 'rxjs/internal/observable/of';
import {FieldStructure} from './form.service';
import {ThoughtspotService} from './thoughtspot.service';

const getDefault = (cs: ContextService, ts: ThoughtspotService) => {

  return {
    clearFields: (): Observable<any> => {
      cs.msgs.info("Clearing Fields!!");
      const latterFields: FieldStructure[] = cs.getLatter();
      latterFields.forEach(latterField => latterField.control.reset());
      return of(true);
    },

    disableFields: (): Observable<any> => {
      cs.msgs.info("Disable Fields!!");
      const latterFields: FieldStructure[] = cs.getLatter();
      latterFields.forEach(latterField => latterField.control.disable());
      return of(true);
    },

    loadData: ():Observable<any> => {
      cs.msgs.info("Loading Data!!");
      const next:FieldStructure = cs.getNext();

      if(next){
        const {config, dataSubject} = next;
        return ts.getData(config.data.pinboardGUID, cs.getFormer()).pipe(
          take(1),
          tap((data) => console.log('data from ts: ', data)),
          tap( data => dataSubject.next(data))
        )
      } else {
        return of(null);
      }
    },

    handleSpecialCounts: ():Observable<any> => {
      cs.msgs.info("Handling Special Counts!!");
      const next:FieldStructure = cs.getNext();

      if(next){
        return next.dataStream.pipe(
          take(1),
          tap((vals) => console.log('special count vals: ', vals)),
          tap((vals) => {
            if(vals.length > 0){
              next.control.enable();
            }
            if(vals.length === 1){
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

export const getLifeCycle = (cs: ContextService, ts: ThoughtspotService, id?: string) => {
  const defaultLC = getDefault(cs, ts);
  if(id === 'alternative'){
    cs.msgs.info("LOADING FROM ALTERNATIVE LOAD DATA!!!");
    //defaultLC.loadData = () => { console.log("LOADING FROM ALTERNATIVE LOAD DATA!!!"); return defaultLC.loadData()}
    return {
      clearFields: defaultLC.clearFields,
      disableFields: defaultLC.disableFields,
      loadData: () => {console.log("IN ALTERNATIVE DATA!!!!"); return defaultLC.loadData()},
      handleSpecialCounts: defaultLC.handleSpecialCounts,
    }
  }
  return defaultLC;
};

//export default getLifeCycle;
