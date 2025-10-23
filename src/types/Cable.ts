export interface Cable {
  id: string;
  reference: string;
  description: string;
  quantity: number;
  unit: string;
  alertThreshold: number;
  location: string;
  lastUpdated: string;
}

export type CableFormData = Omit<Cable, 'id' | 'lastUpdated'>;