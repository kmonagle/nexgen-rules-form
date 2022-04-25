import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

export interface User{
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userSubject = new BehaviorSubject<User | null>(null);
  user = this._userSubject.asObservable();

  constructor() {
    this._userSubject.next({role: "state"});
  }
}
