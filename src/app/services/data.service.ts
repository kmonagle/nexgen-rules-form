import { Injectable } from '@angular/core';
import {ThoughtspotService} from './thoughtspot.service';
import {Filter} from '../model/Filter';
import {DataSources} from '../model/constants';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private ts: ThoughtspotService) { }

  getData(filter: Filter, formerFilters: Filter[]){
    if(filter.config.data.type === DataSources.THOUGHTSPOT){
      return this.ts.getData(filter.config.data.pinboardGUID, formerFilters);
    }
    return this.ts.getData(filter.config.data.pinboardGUID, formerFilters);
  }

}
