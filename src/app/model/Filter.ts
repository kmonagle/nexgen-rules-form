import {FilterConfig} from './interfaces';
import {FormControl} from '@angular/forms';
import {KeyValue} from '../app.component';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {FilterService} from '../services/filter.service';

export class Filter{

  name: string;
  config: FilterConfig;
  control: FormControl;
  _dataSubject: BehaviorSubject<KeyValue[] | null>;
  dataStream: Observable<KeyValue[] | null>;
  index: number;
  isCurrent: boolean;
  isFirst: boolean;
  visible: boolean;

  constructor(filterData: FilterConfig, index: number, private fs: FilterService){
    this.name = filterData.name;
    this.index = index;
    this.config = filterData;
    this.control = new FormControl({value: filterData.initialValue, disabled: filterData.disabled});
    this._dataSubject = new BehaviorSubject<KeyValue[] | null>(null);
    this.dataStream = this._dataSubject.asObservable();
    this.isCurrent = false;
    this.visible = filterData.visible === false ? false : true;
    this.isFirst = (index === 0);
  }

  populate(data: KeyValue[]){
    console.log('populating: ', data);
    this._dataSubject.next(data)
  }

  getFormer(): Filter[]{
    return this.fs.getFormer(this);
  }

  getLatter(): Filter[]{
    return this.fs.getLatter(this);
  }

  getNext(): Filter{
    return this.fs.getNext(this);
  }
}
