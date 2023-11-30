export interface ResultInterface {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  target: number,
  weekData: Array<number>
): ResultInterface => {
  const trainingDays: Array<number> = [];

  for (let i = 0; i < weekData.length; i++) {
    if (weekData[i] > 0) {
      trainingDays.push(weekData[i]);
    }
  }

  function getAvg(arr: Array<number>): number {
    return arr.reduce((prev, value) => prev + value, 0) / weekData.length;
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
    if (percentile < 50) {
      return (1);
    } else if (percentile >= 50 && percentile < 99) {
      return (2);
    } else if (percentile >= 99) {
      return (3);
    }

    return 0;
  };

  const rating: number = getRating(getAvg(weekData), target);

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
    success: succes,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: Math.round(getAvg(weekData) * 100) / 100,
  };
};