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

export interface FormFieldDataParam {
  name: string;
}

export interface FormFieldData {
  pinboardGUID: string;
  param: FormFieldDataParam;
}

export interface FormField {
  name: string;
  type: string,
  multi: boolean,
  label: string,
  required: boolean,
  data: FormFieldData;
  initialValue: string;
  disabled: boolean;
  lifecycle?: string
}

export interface FilterConfig {
  name: string;
  type: string,
  multi: boolean,
  label: string,
  required: boolean,
  data: FormFieldData;
  initialValue: string;
  disabled: boolean;
  lifecycle?: string
}

export interface LifecycleData {
  loadData?: any,
  clearFields?: any;
  disableFields?: any;
  handleSpecialCounts?: any;
}
