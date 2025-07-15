import type { State } from './dlTypes';
import { commonCanadianFields } from './commonFields';

export const canadaStates: State[] = [
  {
    name: "Alberta",
    fields: [...commonCanadianFields]
  },
  {
    name: "British Columbia",
    fields: commonCanadianFields.filter(field => field.code !== "DAD")
  },
  {
    name: "Manitoba",
    fields: [...commonCanadianFields]
  },
  {
    name: "New Brunswick",
    fields: [...commonCanadianFields]
  },
  {
    name: "Newfoundland and Labrador",
    fields: [...commonCanadianFields]
  },
  {
    name: "Northwest Territories",
    fields: [...commonCanadianFields]
  },
  {
    name: "Nova Scotia",
    fields: [...commonCanadianFields]
  },
  {
    name: "Nunavut",
    fields: [...commonCanadianFields]
  },
  {
    name: "Ontario",
    fields: [...commonCanadianFields]
  },
  {
    name: "Prince Edward Island",
    fields: [...commonCanadianFields]
  },
  {
    name: "Quebec",
    fields: [...commonCanadianFields, { code: "DCF", label: "Document Discriminator", type: "text", required: false }]
  },
  {
    name: "Saskatchewan",
    fields: [...commonCanadianFields]
  },
  {
    name: "Yukon",
    fields: [...commonCanadianFields]
  }
];
