
export interface Client {
  id: string;
  name: string;
  tin: string; // Tax Identification Number
  ogrn: string; // Primary State Registration Number
  legalAddress: string;
  actualAddress: string;
  phoneNumber: string;
  contactPerson: string;
  contactPersonPhone: string;
  contracts: Contract[];
}

export interface Contract {
  id: string;
  clientId: string;
  subscriberPoints: SubscriberPoint[];
}

export interface SubscriberPoint {
  id: string;
  contractId: string;
  name: string;
  validityDate: string; // ISO date string
}
