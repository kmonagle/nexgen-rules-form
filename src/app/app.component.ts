import {AfterViewInit, Component} from '@angular/core';
import {FilterService} from './services/filter.service';
import {Filter} from './model/Filter';
import {Observable} from 'rxjs';
import {Button} from './model/Button';
import {ButtonService} from './services/button.service';

export interface KeyValue{
  key: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  filters$: Observable<Filter[]|null>;
  buttons$: Observable<Button[]|null>;

  constructor(private filterService: FilterService, private buttonService: ButtonService){
    this.filters$ = filterService.filters;
    this.filters$.subscribe(filters => console.log("app component got filters: ", filters));
    this.buttons$ = buttonService.buttons;
  }

}
