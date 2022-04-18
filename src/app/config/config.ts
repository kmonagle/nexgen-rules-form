export const config = {
  form:{
    fields: [
      {
        name: "report",
        type: "select",
        multi: false,
        label: "Report",
        required: true,
        data: {
          pinboardGUID: "78c5a246-b6a6-49aa-aa16-b4340957b78c",
          param: {
            name: "report"
          }
        },
        initialValue: "",
        disabled: false,
        lifecycle: "alternative"
      },
      {
        name: "administration",
        type: "select",
        multi: false,
        label: "Administration",
        required: true,
        data: {
          pinboardGUID: "f1a77437-b6d3-406f-9982-5d600bb09dd6",
          param: {
            name: "administration"
          }
        },
        initialValue: "",
        disabled: true
      },
      {
        name: "district",
        type: "select",
        multi: false,
        label: "District",
        required: true,
        data: {
          pinboardGUID: "c9ac5220-aa49-49f8-a2c6-f729b9412fdb",
          param: {
            name: "district"
          }
        },
        initialValue: "",
        disabled: true
      },
      {
        name: "school",
        type: "select",
        multi: false,
        label: "School",
        required: true,
        data: {
          pinboardGUID: "985ad04f-165e-47fd-a227-b18a64ee8a00",
          param: {
            name: "school"
          }
        },
        initialValue: "",
        disabled: true
      }
    ]
  }
};

