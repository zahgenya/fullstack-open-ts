import express from "express";
import patientService from "../services/patientsService";
import {
  toNewPatientEntry,
  toNewHealthCheckEntry,
  toNewHospitalEntry,
  toNewOccupationalEntry,
} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/healthCheckEntry", (req, res) => {
  try {
    const healthCheckEntry = toNewHealthCheckEntry(req.body);
    const addedHealthCheckEntry = patientService.addHealthCheckEntry(
      healthCheckEntry,
      req.params.id
    );
    res.json(addedHealthCheckEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/hospitalEntry", (req, res) => {
  try {
    const hospitalEntry = toNewHospitalEntry(req.body);
    const addedHospitalEntry = patientService.addHospitalEntry(
      hospitalEntry,
      req.params.id
    );
    res.json(addedHospitalEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/occupationalEntry", (req, res) => {
  try {
    const occupationalEntry = toNewOccupationalEntry(req.body);
    const addedOccupationalEntry = patientService.addOccupationalEntry(
      occupationalEntry,
      req.params.id
    );
    res.json(addedOccupationalEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
