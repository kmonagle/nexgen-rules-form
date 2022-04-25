import {ButtonConfig} from './interfaces';

export class Button{

  name: string;
  config: ButtonConfig;
  visible: boolean;
  enabled: boolean;
  label: string;

  constructor(buttonConfig: ButtonConfig){
    this.name = buttonConfig.name;
    this.config = buttonConfig;
    this.label = buttonConfig.label;
    this.enabled = true;
    this.visible = true;
  }
}
