import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ResultInterface } from "./exerciseCalculator";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters " });
  }

  const bmiResult = calculateBmi(height, weight);

  return res.json(bmiResult);
});

interface ExerciseRequestInterface {
  target: number;
  daily_exercises: number[];
}

interface errorResponse {
  error: string;
}

app.post(
  "/exercises",
  (req: express.Request<Record<string, never>, ResultInterface | errorResponse, ExerciseRequestInterface>, res: express.Response<ResultInterface | errorResponse>) => {
    const body = req.body;

    if (
      !body.daily_exercises ||
      body.daily_exercises.some((v: number) => isNaN(v)) ||
      isNaN(body.target)
    ) {
      return res
        .status(400)
        .json({ error: "malformatted parameters" } as errorResponse);
    }

    const exrResult = calculateExercises(
      body.target,
      body.daily_exercises
    );

    return res.json(exrResult);
  }
);

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
