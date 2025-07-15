import type { Country } from './dlTypes';
import { usaStates } from './usaStates';
import { canadaStates } from './canadaStates';
import { australiaStates } from './australiaStates';

export const dlFieldsData: Country[] = [
  {
    name: "USA",
    states: usaStates
  },
  {
    name: "Canada",
    states: canadaStates
  },
  {
    name: "Australia",
    states: australiaStates
  }
];