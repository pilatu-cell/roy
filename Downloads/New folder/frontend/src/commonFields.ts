import type { DLField } from './dlTypes';

export const commonUSFields: DLField[] = [
  { code: "DCA", label: "DL Class", type: "text", required: true, placeholder:"C" },
  { code: "DAQ", label: "DL Number", type: "text", required: true },
  { code: "DCB", label: "Restrictions", type: "text", required: true, placeholder: "None" },
  { code: "DCD", label: "Endorsement", type: "text", required: true, placeholder: "None" },
  { code: "DCS", label: "Last Name", type: "text", required: true, placeholder: "Doe" },
  { code: "DAC", label: "First Name", type: "text", required: true, placeholder: "John" },
  { code: "DAD", label: "Middle Name", type: "text", required: false, placeholder: "A" },
  { code: "DBD", label: "Document Issue Date", type: "date", required: true, placeholder: "YYYY-MM-DD" },
  { code: "DBB", label: "Date of Birth", type: "date", required: true,  placeholder: "YYYY-MM-DD" },
  { code: "DBC", label: "Gender", type: "select", required: true, options: ["M", "F", "X"] },
  { code: "DD", label: "Donor", type: "select", required: true, options: ["Yes","No"] },
  { code: "DAY", label: "Eye Color", type: "select", required: true, options: ["BLU", "BRO", "GRY", "GRN", "HAZ", "BLK"] },
  //{ code: "DAZ", label: "Hair Color", type: "select", required: true, options: ["BLU", "BRO", "GRY", "GRN", "HAZ", "BLK"] },
  { code: "DAU", label: "Height (inches)", type: "number", required: true, placeholder: "70"},
  { code: "DAW", label: "Weight (lbs)", type: "number", required: false, placeholder: "180" },
  { code: "DAG", label: "Street Address", type: "text", required: true, placeholder: "123 Main St" },
  { code: "DAI", label: "City", type: "text", required: true, placeholder: "Anytown" },
  { code: "DAK", label: "ZIP Code", type: "text", required: true, placeholder: "12345" },
];

export const commonCanadianFields: DLField[] = [
  { code: "DAQ", label: "Driver License Number", type: "text", required: true },
  { code: "DCS", label: "Family Name", type: "text", required: true },
  { code: "DAC", label: "First Name", type: "text", required: true },
  { code: "DAD", label: "Middle Name", type: "text", required: false },
  { code: "DBD", label: "Document Issue Date", type: "date", required: true },
  { code: "DBB", label: "Date of Birth", type: "date", required: true },
  { code: "DBC", label: "Gender", type: "select", required: true, options: ["M", "F", "X"] },
  { code: "DAY", label: "Eye Color", type: "select", required: true, options: ["BLU", "BRO", "GRY", "GRN", "HAZ", "BLK"] },
  { code: "DAU", label: "Height (cm)", type: "number", required: true },
  { code: "DAW", label: "Weight (kg)", type: "number", required: false },
  { code: "DAG", label: "Street Address", type: "text", required: true },
  { code: "DAI", label: "City", type: "text", required: true },
  { code: "DAJ", label: "Province", type: "text", required: true },
  { code: "DAK", label: "Postal Code", type: "text", required: true }
];
