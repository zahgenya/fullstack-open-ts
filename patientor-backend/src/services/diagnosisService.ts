import diagnosisData from '../../data/diagnoses';

import { diagnosesEntry } from '../types';

const getDiagnosis = (): diagnosesEntry[] => {
  return diagnosisData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnosis,
  addDiagnosis
};