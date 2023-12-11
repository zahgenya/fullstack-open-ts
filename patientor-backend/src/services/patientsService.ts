import patientData from '../../data/patients';

import { nonSensitivePatientEntry, patientEntry, newPatientEntry } from '../types';

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

const findPatientById = (id: string): nonSensitivePatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
}

export default {
  getPatients,
  addPatient,
  findPatientById,
  getPatientsEntry
};


