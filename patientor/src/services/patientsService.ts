import patientData from '../../data/patients';

import { nonSensitivePatientEntry } from '../types';

const getPatients = (): nonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient
};


