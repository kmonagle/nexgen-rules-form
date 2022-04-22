import {ButtonConfig} from './interfaces';
import {FilterService} from '../services/filter.service';
import {ButtonService} from '../services/button.service';

export class Button{

  name: string;
  config: ButtonConfig;
  visible: boolean;
  enabled: boolean;
  label: string;

  constructor(buttonConfig: ButtonConfig, private bs: ButtonService, private fs: FilterService){
    this.name = buttonConfig.name;
    this.config = buttonConfig;
    this.label = buttonConfig.label;
    this.enabled = false;
    this.visible = true;
  }
}
