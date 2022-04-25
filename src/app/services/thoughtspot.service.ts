import { Injectable } from '@angular/core';
import {KeyValue} from '../app.component';
import {of} from 'rxjs';
import {Observable} from 'rxjs';
import {Filter} from '../model/Filter';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class ThoughtspotService {

  constructor(private ms: MessageService) { }

  getData(guid: string, formerFields: Filter[]): Observable<KeyValue[]> {

    let tsUrl = `https://ts-analytics-le.drcedirect.com/callosum/v1/tspublic/v1/pinboarddata?id=${guid}`;
    formerFields.forEach(field => {
      tsUrl += `&${field.config.data.param.name}=${field.control.value}`
    });
    this.ms.info('Calling: ' + tsUrl);


    if (guid === '78c5a246-b6a6-49aa-aa16-b4340957b78c') {
      return of([
        {key: "rep1", value: "Cumulative"},
        {key: "rep2", value: "Concurrent"},
      ]);
    } else if (guid === 'f1a77437-b6d3-406f-9982-5d600bb09dd6') {
      return of([
        {key: "consortium", value: "Consortium"},
        {key: "state", value: "State"},
        {key: "district", value: "District"},
        {key: "school", value: "School"}
      ]);
    } else if(guid === 'c9ac5220-aa49-49f8-a2c6-f729b9412fdb') {
      return of([
        {key: "dist1", value: "Minnesota"},
        {key: "dist2", value: "Texas"},
      ]);
    } else if(guid==='985ad04f-165e-47fd-a227-b18a64ee8a00'){
      return of([
        {key: "school1", value: "School 1"},
        {key: "school2", value: "School 2"},
      ]);
    } else if(guid === "c9ac5220-aa49-49f8-a2c6-f729b9412999"){
      return of([
        {key: "assessment1", value: "Assessment 1"},
        {key: "assessment2", value: "Assessment 2"},
      ]);
    }

    return of([]);
  }

}
