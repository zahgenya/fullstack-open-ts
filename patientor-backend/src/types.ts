export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

interface BaseEntry {
  id: string;
  description?: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating?: HealthCheckRating;
}

export type Discharge = {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export interface sickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName?: string;
  sickLeave?: sickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationHealthcareEntry
  | HealthCheckEntry;

export interface patientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type nonSensitivePatientEntry = Omit<patientEntry, 'ssn' | 'entries'>;

export type newPatientEntry = Omit<patientEntry, 'id'>;

export type newEntry = Omit<Entry, 'id'>;