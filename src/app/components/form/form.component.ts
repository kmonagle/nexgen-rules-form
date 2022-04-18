import {Component, Input, OnInit} from '@angular/core';
import {FieldStructure} from '../../services/form.service';

@Component({
  selector: 'iris-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input()
  fields: FieldStructure[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
