import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FilterService} from './services/filter.service';
import {Filter} from './model/Filter';

export interface KeyValue{
  key: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  filters: Filter[] = [];

  constructor(private filterService: FilterService){}

  ngOnInit(): void {
    this.filters = this.filterService.filters;
  }

  ngAfterViewInit(): void {
    this.filterService.loadApp(); //load up the first filter
  }

}
