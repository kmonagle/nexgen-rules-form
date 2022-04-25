// {
//   name: "report",
//     type: "select",
//   multi: false,
//   label: "Report",
//   required: true,
//   data: {
//   pinboardGUID: "78c5a246-b6a6-49aa-aa16-b4340957b78c",
//     param: {
//     name: "report"
//   }
// }
// }

import {DataSources} from './constants';

export interface FormFieldDataParam {
  name: string;
}

export interface FormFieldData {
  pinboardGUID: string;
  param: FormFieldDataParam;
  type: string
}

export interface FilterConfig {
  name: string;
  type: string,
  multi: boolean,
  label: string[],
  required: boolean,
  data: FormFieldData;
  initialValue: string;
  handler?: string;
  enabledRules?: any[];
  visibleRules?: any[];
  labelRules?: any[];
  loadRules?: any[];
  change?: any[]
}

export interface ButtonConfig {
  name: string;
  label: string,
  enabledRules?: any[];
  visibleRules?: any[];
}

export interface LifecycleData {
  loadData?: any,
  clearFields?: any;
  disableFields?: any;
  handleSpecialCounts?: any;
}
