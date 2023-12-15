import {
  newPatientEntry,
  Gender,
  Entry,
  Diagnosis,
  HealthCheckRating,
  newHealthCheckEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (digit: unknown): digit is number => {
  return typeof digit === "number" || digit instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseEntry = (entry: unknown): Entry => {
  return entry as Entry;
};

const parseEntries = (entries: unknown[]): Entry[] => {
  return entries.map(parseEntry);
};

const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntryPatient: newPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries((object.entries as unknown[]) || []),
    };

    return newEntryPatient;
  }

  throw new Error("Incorrect data: a field is missing");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

// const parseType = (type: unknown): Entry['type'] => {
//   if (
//     type !== "OccupationalHealthcare" &&
//     type !== "Hospital" &&
//     type !== "HealthCheck"
//   ) {
//     throw new Error("Incorrect or missing type");
//   }

//   return type as Entry['type'];
// };

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating)) {
    throw new Error("Incorrect or missing health check rating");
  }

  return healthCheckRating;
};

const toNewHealthCheckEntry = (object: unknown): newHealthCheckEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "date" in object &&
    "specialist" in object &&
    "type" in object &&
    "healthCheckRating"
  ) {
    if (object.type !== "HealthCheck") {
      throw new Error("Incorrect or missing type");
    }

    const newEntryObj: newHealthCheckEntry = {
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: "HealthCheck",
    };

    if ("healthCheckRating" in object) {
      newEntryObj.healthCheckRating = parseHealthCheckRating(
        object.healthCheckRating
      );
    }

    if ("description" in object) {
      newEntryObj.description = parseDescription(object.description);
    }

    if ("diagnosisCodes" in object) {
      newEntryObj.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }

    return newEntryObj;
  }

  throw new Error("Incorrect data: a field is missing");
};

export { toNewPatientEntry, toNewHealthCheckEntry };
