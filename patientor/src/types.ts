export interface diagnosesEntry {
  code: string;
  name: string;
  latin?: string;
};

export interface patientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export enum gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type nonSensitivePatientEntry = Omit<patientEntry, 'ssn'>;

export type newPatientEntry = Omit<patientEntry, 'id'>;