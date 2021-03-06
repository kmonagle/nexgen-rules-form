import {FilterConfig} from './interfaces';
import {FormControl} from '@angular/forms';
import {KeyValue} from '../app.component';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {TopLevelCondition} from 'json-rules-engine';

export class Filter{

  name: string;
  label: string;
  config: FilterConfig;
  control: FormControl;
  _dataSubject: BehaviorSubject<KeyValue[] | null>;
  dataStream: Observable<KeyValue[] | null>;
  index: number;
  isCurrent: boolean;
  isFirst: boolean;
  visible: boolean;
  visibleRules: TopLevelCondition | null;
  labelRules: TopLevelCondition[] | null;
  enabled: boolean;
  enabledRules: TopLevelCondition | null;

  constructor(filterData: FilterConfig, index: number){
    this.name = filterData.name;
    this.label = filterData.label[0];
    this.index = index;
    this.config = filterData;
    this.enabled = true;
    this.visible = true;
    this.enabledRules = filterData.enabledRules!;
    this.visibleRules = filterData.visibleRules!;
    this.labelRules = filterData.labelRules;
    this.control = new FormControl({value: filterData.initialValue, disabled: !this.enabled});
    this._dataSubject = new BehaviorSubject<KeyValue[] | null>(null);
    this.dataStream = this._dataSubject.asObservable();
    this.isCurrent = false;

    this.isFirst = (index === 0);
  }

  populate(data: KeyValue[]){
    this._dataSubject.next(data)
  }
}
