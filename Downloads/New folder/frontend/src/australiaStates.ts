import type { State } from './dlTypes';
import { commonUSFields } from './commonFields';

export const australiaStates: State[] = [
  {
    name: "New South Wales",
    fields: [
      ...commonUSFields,
      { code: "DCH", label: "Federal Limits Apply", type: "select", required: false, options: ["Y", "N"] },
      { code: "DCI", label: "Hazmat Endorsement", type: "select", required: false, options: ["Y", "N"] }
    ]
  },
  {
    name: "Victoria",
    fields: [
      ...commonUSFields,
      { code: "DCJ", label: "CDL Indicator", type: "select", required: false, options: ["Y", "N"] }
    ]
  },
  {
    name: "Queensland",
    fields: [
      ...commonUSFields,
      { code: "DCK", label: "Medical Certificate", type: "select", required: false, options: ["Y", "N"] }
    ]
  },
  {
    name: "Western Australia",
    fields: [
      ...commonUSFields,
      { code: "DCL", label: "Motorcycle Endorsement", type: "select", required: false, options: ["Y", "N"] }
    ]
  },
  {
    name: "South Australia",
    fields: [
      ...commonUSFields,
      { code: "DCM", label: "School Bus Endorsement", type: "select", required: false, options: ["Y", "N"] }
    ]
  },
  {
    name: "Tasmania",
    fields: [
      ...commonUSFields,
      { code: "DCN", label: "Veteran Indicator", type: "select", required: false, options: ["Y", "N"] }
    ]
  },
  {
    name: "Australian Capital Territory",
    fields: [
      ...commonUSFields,
      { code: "DCO", label: "Organ Donor", type: "select", required: false, options: ["Y", "N"] }
    ]
  },
  {
    name: "Northern Territory",
    fields: [
      ...commonUSFields,
      { code: "DCP", label: "Duplicate License", type: "select", required: false, options: ["Y", "N"] }
    ]
  }
];