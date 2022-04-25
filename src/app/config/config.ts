export const config = {
  form:{
    buttons: [
      {
        name: "submit",
        label: "Submit",
        enabledRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              any: [
                {
                  all: [
                    {
                      "fact": "view",
                      "operator": "equal",
                      "value": "state",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "state",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                  ]
                },
                {
                  all: [
                    {
                      "fact": "view",
                      "operator": "equal",
                      "value": "district",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "district",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "state",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                  ]
                },
                {
                  all: [
                    {
                      "fact": "view",
                      "operator": "equal",
                      "value": "school",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "district",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "state",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "school",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                  ]
                },

              ]
            },
          ]
        } ,
        visibleRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              any: [
                {
                  all: [
                    {
                      "fact": "view",
                      "operator": "equal",
                      "value": "state",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "state",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                  ]
                },
                {
                  all: [
                    {
                      "fact": "view",
                      "operator": "equal",
                      "value": "district",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "district",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "state",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                  ]
                },
                {
                  all: [
                    {
                      "fact": "view",
                      "operator": "equal",
                      "value": "school",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "district",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "state",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                    {
                      "fact": "school",
                      "operator": "exists",
                      "value": "",
                      "path": "$.control.value"
                    },
                  ]
                },
              ]
            },
          ]
        } ,
      },
    ],
    fields: [
      {
        name: "report",
        type: "select",
        multi: false,
        label: ["Report"],
        required: true,
        data: {
          pinboardGUID: "78c5a246-b6a6-49aa-aa16-b4340957b78c",
          param: {
            name: "report"
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: null,
        enabledRules: null,
        labelRules: [],
        handler: "alt",
        loadRules: null,
      },
      {
        name: "view",
        type: "select",
        multi: false,
        label: ["View"],
        required: true,
        data: {
          pinboardGUID: "f1a77437-b6d3-406f-9982-5d600bb09dd6",
          param: {
            name: "view"
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
        enabledRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
        labelRules: null,
        loadRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
      },
      {
        name: "state",
        type: "select",
        multi: false,
        label: ["State"],
        required: true,
        data: {
          pinboardGUID: "c9ac5220-aa49-49f8-a2c6-f729b9412fdb",
          param: {
            name: "state"
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
        enabledRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
        labelRules: null,
        loadRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
      },
      {
        name: "district",
        type: "select",
        multi: false,
        label: ["District"],
        required: true,
        data: {
          pinboardGUID: "985ad04f-165e-47fd-a227-b18a64ee8444",
          param: {
            name: "district"
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              any: [
                {
                  "fact": "view",
                  "operator": "equal",
                  "value": "district",
                  "path": "$.control.value"
                },
                {
                  "fact": "view",
                  "operator": "equal",
                  "value": "school",
                  "path": "$.control.value"
                }
              ]
            }
          ]
        },
        enabledRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "state",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
        labelRules: null,
        loadRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "state",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
      },
      {
        name: "school",
        type: "select",
        multi: false,
        label: ["School"],
        required: true,
        data: {
          pinboardGUID: "985ad04f-165e-47fd-a227-b18a64ee8a00",
          param: {
            name: "school"
          },
          type: "THOUGHTSPOT"
        },
        initialValue: "",
        visibleRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "equal",
              "value": "school",
              "path": "$.control.value"
            }
          ]
        },
        enabledRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "state",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "district",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
        labelRules: null,
        loadRules: {
          "all": [
            {
              "fact": "report",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "view",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "state",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            },
            {
              "fact": "district",
              "operator": "exists",
              "value": "",
              "path": "$.control.value"
            }
          ]
        },
      },
    ]
  }
};
