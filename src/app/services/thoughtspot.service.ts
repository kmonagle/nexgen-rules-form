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

    console.log('guid: ', guid);
    console.log('formerFields: ', formerFields);

    let tsUrl = `https://ts-analytics-le.drcedirect.com/callosum/v1/tspublic/v1/pinboarddata?id=${guid}`;
    formerFields.forEach(field => {
      tsUrl += `&${field.config.data.param.name}=${field.control.value}`
    });
    console.log('tsUrl: ', tsUrl);
    this.ms.info('Calling: ' + tsUrl);


    if (guid === '78c5a246-b6a6-49aa-aa16-b4340957b78c') {
      return of([
        {key: "rep1", value: "Report 1"},
        {key: "rep2", value: "Report 2"},
      ]);
    } else if (guid === 'f1a77437-b6d3-406f-9982-5d600bb09dd6') {
      return of([
        {key: "admin1", value: "Admin 1"}
      ]);
    } else if(guid === 'c9ac5220-aa49-49f8-a2c6-f729b9412fdb') {
      return of([
        {key: "dist1", value: "District 1"},
        {key: "dist2", value: "District 2"},
      ]);
    } else if(guid==='985ad04f-165e-47fd-a227-b18a64ee8a00'){
      return of([
        {key: "school1", value: "School 1"},
        {key: "school2", value: "School 2"},
      ]);
    }

    return of([]);
  }

}
