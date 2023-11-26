const calculateBmi = (h: number, w: number): string => {
  let hM = h / 100
  const result = w / (hM ** 2)

  if (result >= 18.5 && result <= 24.9) {
    return "Normal (healthy weight)"
  } else if (result <= 18.5) {
    return "Bad (underweight)"
  } else {
    return "Bad (obese)"
  }
}


console.log(calculateBmi(165, 65))