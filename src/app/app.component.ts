import {AfterViewInit, Component} from '@angular/core';
import {FilterService} from './services/filter.service';
import {Filter} from './model/Filter';
import {Observable} from 'rxjs';

export interface KeyValue{
  key: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  filters$: Observable<Filter[]|null>;

  constructor(private filterService: FilterService){
    this.filters$ = filterService.filters;
  }

  ngAfterViewInit(): void {
    this.filterService.loadApp(); //load up the first filter
  }

}
