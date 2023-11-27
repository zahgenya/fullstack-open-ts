interface ResultInterface {
  periodLength: number;
  trainingDays: number;
  succes: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exrValues {
  value1: number;
  value2: Array<number>;
}

const parseExerciseArgs = (args: string[]) => {
  if (args.length < 3) throw new Error("Not enough arguments");

  const value1 = Number(args[3]);
  const value2 = args.slice(4).map(Number);

  if (value2.some(isNaN) || isNaN(value1)) {
    throw new Error("Invalid arguments");
  }

  return { value1, value2 };
};

const calculateExercises = (
  target: number,
  weekData: Array<number>
): ResultInterface => {
  let trainingDays: Array<number> = [];

  for (let i = 0; i < weekData.length; i++) {
    if (weekData[i] > 0) {
      trainingDays.push(weekData[i]);
    }
  }

  function getAvg(arr: Array<number>): number {
    return weekData.reduce((prev, value) => prev + value, 0) / weekData.length;
  }

  const isSucces = (averageHours: number, targetHours: number): boolean => {
    if (averageHours >= targetHours) {
      return true;
    } else {
      return false;
    }
  };

  const succes: boolean = isSucces(getAvg(weekData), target);

  const getRating = (val: number, target: number): number => {
    const percentile = (val / target) * 100;
    let score: number;
    if (percentile < 50) {
      return (score = 1);
    } else if (percentile >= 50 && percentile < 99) {
      return (score = 2);
    } else if (percentile >= 99) {
      return (score = 3);
    }
  };

  const rating: number = getRating(getAvg(weekData), target);

  console.log(
    "val is: ",
    getAvg(weekData),
    "and target is: ",
    target,
    "OPERATION: ",
    getRating(getAvg(weekData), target)
  );

  let ratingDescription: string;

  switch (rating) {
    case 1:
      ratingDescription = "Not too bad, but could be better";
      break;
    case 2:
      ratingDescription = "Pretty good you almost did it";
      break;
    case 3:
      ratingDescription = "Good job you did it!";
      break;
    default:
      ratingDescription = "Error: unknown rating value";
  }

  return {
    periodLength: weekData.length,
    trainingDays: trainingDays.length,
    succes: succes,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: Math.round(getAvg(weekData) * 100) / 100,
  };
};

try {
  const { value1, value2 } = parseExerciseArgs(process.argv);
  calculateExercises(value1, value2);
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += " Error " + error.message;
  }
  console.log(errorMessage);
}