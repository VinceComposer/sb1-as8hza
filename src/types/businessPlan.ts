export interface BusinessPlanSection {
  id: string;
  title: string;
  description: string;
  objectives: string[];
}

export interface BusinessPlanField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'file';
  tooltip: string;
  placeholder?: string;
  prepopulate?: boolean;
}

export interface BusinessPlanData {
  [key: string]: {
    [key: string]: string | File[];
  };
}