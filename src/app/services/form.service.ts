import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs/index';
import {AbstractControl, FormControl} from '@angular/forms';
import {FormField} from '../model/FormField';
import {tap, mergeMap, filter} from 'rxjs/operators';
import {KeyValue} from '../app.component';
import {config} from '../config/config';
import {ThoughtspotService} from './thoughtspot.service';
import {MessageService} from './message.service';
import {ContextService} from './context.service';
import {getLifeCycle} from './LifecycleServiceFactory';

export interface FieldStructure {
  config: FormField;
  control: AbstractControl;
  dataStream: Observable<KeyValue[]>;
  dataSubject: Subject<KeyValue[]>;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  fieldStructures: any = {};

  formControls:any = {};
  formSubjects:any = {};
  formStreams:any = {};

  constructor(private ts: ThoughtspotService, private ms: MessageService, private cs: ContextService) {
    console.log('config: ', config);
    config.form.fields.forEach((field: FormField) => {

      this.fieldStructures[field.name] = {config: field};

      this.formControls[field.name] = new FormControl({value: field.initialValue, disabled: field.disabled});

      const control:AbstractControl = this.formControls[field.name];
      this.fieldStructures[field.name].control = control;

      this.formSubjects[field.name] = new BehaviorSubject<KeyValue[] | null>(null);
      this.formStreams[field.name] = this.formSubjects[field.name].asObservable();
      this.fieldStructures[field.name].dataStream = this.formStreams[field.name];
      this.fieldStructures[field.name].dataSubject = this.formSubjects[field.name];

    });

    this.cs.fieldStructures = this.fieldStructures;

    config.form.fields.forEach((field: FormField) => {
      const control:AbstractControl = this.formControls[field.name];

      const lifecycle = getLifeCycle(cs, ts, field.lifecycle);

      let clearFields = lifecycle.clearFields;
      let disableFields = lifecycle.disableFields;
      let loadData = lifecycle.loadData;
      let handleSpecialCounts = lifecycle.handleSpecialCounts;

      control.valueChanges.pipe(
        filter(val => val),
        tap((val) => console.log(`${field.name} changed to ${val}`)),
        tap(() => this.cs.currentChange = this.fieldStructures[field.name]),
        mergeMap(() => clearFields()),
        mergeMap(() => disableFields()),
        mergeMap(() => loadData()),
        mergeMap(() => handleSpecialCounts())
      ).subscribe();
    });
  }

  loadApp(){
    // load data for the first field
    const {config, dataSubject} = this.cs.firstField();

    this.ts.getData(config.data.pinboardGUID, []).pipe(
      tap((data) => console.log('data from ts: ', data)),
      tap( data => dataSubject.next(data))
    ).subscribe();

  }
}
