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
import {RuleProperties, TopLevelCondition} from 'json-rules-engine';

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
  enabledRules: TopLevelCondition | null;
  visibleRules: TopLevelCondition | null;
  labelRules: TopLevelCondition[] | null;
  loadRules: TopLevelCondition | null;
}

export interface ButtonConfig {
  name: string;
  label: string,
  enabledRules?: TopLevelCondition | null;
  visibleRules?: TopLevelCondition | null;
}

export interface LifecycleData {
  loadData?: any,
  clearFields?: any;
  disableFields?: any;
  handleSpecialCounts?: any;
}
