export interface DLField {
    code: string;
    label: string;
    type: 'text' | 'date' | 'select' | 'number';
    required: boolean;
    options?: string[];
    placeholder?: string;
    description?: string;
  }
  
  export interface State {
    name: string;
    fields: DLField[];
  }
  
  export interface Country {
    name: string;
    states: State[];
  }