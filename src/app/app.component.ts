import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormService} from './services/form.service';

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

  fields: any = null;

  constructor(private formService: FormService){}

  ngOnInit(): void {
    this.fields = Object.values(this.formService.fieldStructures);
  }

  ngAfterViewInit(): void {
    this.formService.loadApp();
  }


}
