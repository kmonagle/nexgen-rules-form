import { Injectable } from '@angular/core';
import { getHandler } from "../handlers/handlers"

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor() { }

  getHandler(id?: string){
    console.log("GETTING HANDLER: ", id);
    return getHandler(id);
  }
}
