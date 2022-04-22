export const config = {
  form:{
    buttons: [
      {
        name: "district-report",
        label: "District Report",
        enabledRules: [],
        visibleRules: [],
      },
      {
        name: "school-report",
        label: "School Report",
        enabledRules: [],
        visibleRules: [],
      },
      {
        name: "assessment-report",
        label: "Assessment Report",
        enabledRules: [],
        visibleRules: [],
      }
    ],
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
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: [],
        enabledRules: [],
        change: [],
        handler: "alt",
        load: [],
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
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: [],
        enabledRules: [],
        load: [],
        change: [],
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
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: [],
        enabledRules: [],
        load: [],
        change: [],
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
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: [],
        enabledRules: [],
        load: [],
        change: [],
        handler: "WIDA_school"
      },
      {
        name: "assessment",
        type: "select",
        multi: false,
        label: "Assessment",
        required: true,
        data: {
          pinboardGUID: "c9ac5220-aa49-49f8-a2c6-f729b9412999",
          param: {
            name: "assessment"
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: [],
        enabledRules: [],
        load: [],
        change: [],
      }
    ]
  }
};

