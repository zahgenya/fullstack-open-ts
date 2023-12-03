import express from "express";
import patientService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.post("/", (_req, res) => {
  return res.send(null);
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
