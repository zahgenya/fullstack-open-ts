import patientData from '../../data/patients';

import { nonSensitivePatientEntry, patientEntry, newPatientEntry, Entry, newEntry, newHealthCheckEntry, HealthCheckEntry, newHospitalEntry, HospitalEntry, newOccupationalEntry, OccupationHealthcareEntry } from '../types';

import { v1 as uuid } from 'uuid';

const patients: patientEntry[] = patientData;

const getPatientsEntry = (): patientEntry[] => {
  return patients;
};

const getPatients = (): nonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: newPatientEntry): patientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: newEntry, id: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  }

  const selectedPatient = patients.find(p => p.id === id);

  selectedPatient?.entries.push(newEntry);
  return newEntry;
}

const addHealthCheckEntry = (entry: newHealthCheckEntry, id: string): HealthCheckEntry => {
  const newEntry = {
    id: uuid(),
    ...entry
  }

  const selectedPatient = patients.find(p => p.id === id);

  selectedPatient?.entries.push(newEntry);
  return newEntry
}

const addHospitalEntry = (entry: newHospitalEntry, id: string): HospitalEntry => {
  const newEntry = {
    id: uuid(),
    ...entry
  }

  const selectedPatient = patients.find(p => p.id === id);

  selectedPatient?.entries.push(newEntry);
  return newEntry
}

const addOccupationalEntry = (entry: newOccupationalEntry, id: string): OccupationHealthcareEntry => {
  const newEntry = {
    id: uuid(),
    ...entry
  }

  const selectedPatient = patients.find(p => p.id === id)
  
  selectedPatient?.entries.push(newEntry);
  return newEntry
}

const findPatientById = (id: string): nonSensitivePatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
}

export default {
  getPatients,
  addPatient,
  findPatientById,
  getPatientsEntry,
  addEntry,
  addHealthCheckEntry,
  addHospitalEntry,
  addOccupationalEntry
};


