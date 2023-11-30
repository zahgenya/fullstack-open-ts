export const calculateBmi = (h: number, w: number) => {
  const hM = h / 100;
  const result = w / hM ** 2;

  if (result >= 18.5 && result <= 24.9) {
    return { weight: w, height: h, bmi: "Normal (healthy weight)" };
  } else if (result <= 18.5) {
    return { weight: w, height: h, bmi: "Bad (underweight)" };
  } else {
    return { weight: w, height: h, bmi: "Bad (obese)" };
  }
};