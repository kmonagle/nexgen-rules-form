import {FilterConfig, LifecycleData} from './FormField';
import {AbstractControl, FormControl} from '@angular/forms';
import {KeyValue} from '../app.component';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {getLifeCycle} from '../services/LifecycleServiceFactory';
import {ContextService} from '../services/context.service';
import {ThoughtspotService} from '../services/thoughtspot.service';

export class Filter{

  name: string;
  config: FilterConfig;
  control: AbstractControl;
  _dataSubject: BehaviorSubject<KeyValue[] | null>;
  _dataStream: Observable<KeyValue[] | null>;
  lifecycle: LifecycleData;


  constructor(filterData: FilterConfig, cs: ContextService, ts: ThoughtspotService){
    this.name = filterData.name;
    this.config = filterData;
    this.control = new FormControl({value: filterData.initialValue, disabled: filterData.disabled});
    this._dataSubject = new BehaviorSubject<KeyValue[] | null>(null);
    this._dataStream = this._dataSubject.asObservable();
    this.lifecycle = getLifeCycle(cs, ts, filterData.lifecycle);
  }

}
