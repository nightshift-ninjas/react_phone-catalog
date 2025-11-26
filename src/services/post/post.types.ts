export interface NPRequest<T> {
  apiKey: string;
  modelName: string;
  calledMethod: string;
  methodProperties: T;
}

export interface NPCity {
  Description: string;
  DescriptionRu: string;
  Ref: string;
  Area: string;
  SettlementTypeDescription: string;
}

export interface NPWarehouse {
  Description: string;
  DescriptionRu: string;
  Ref: string;
  CityRef: string;
  Number: string;
}

export interface NPResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: string[];
}