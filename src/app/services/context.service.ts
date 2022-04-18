import { Injectable } from '@angular/core';
import {MessageService} from './message.service';
import {FieldStructure} from './form.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  _currentChange: any;
  _fieldStructures: any = {};

  constructor(private messageService: MessageService) { }

  set currentChange(cc: any){
    this._currentChange = cc;
  }

  get currentChange(){
    return this._currentChange;
  }

  set fieldStructures(fs){
    this._fieldStructures = fs;
  }

  get fieldStructures(){
    return this._fieldStructures;
  }

  firstField():FieldStructure{
    return <FieldStructure>Object.values(this.fieldStructures)[0];
  }

  getFormer(): FieldStructure[]{
    const currentIdx = Object.keys(this.fieldStructures).indexOf(this._currentChange.config.name);
    return <FieldStructure[]>Object.values(this.fieldStructures).slice(0,currentIdx + 1);
  }

  getLatter(): FieldStructure[]{
    const currentIdx = Object.keys(this.fieldStructures).indexOf(this._currentChange.config.name);
    return <FieldStructure[]>Object.values(this.fieldStructures).slice(currentIdx + 1);
  }

  getNext(): FieldStructure{
    const currentIdx = Object.keys(this.fieldStructures).indexOf(this._currentChange.config.name);
    return <FieldStructure>Object.values(this.fieldStructures).slice(currentIdx + 1)[0];
  }

  get msgs(){
    return this.messageService;
  }
}
