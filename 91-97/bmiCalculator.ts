interface bmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided arguments were not numbers!");
  }
};

const calculateBmi = (h: number, w: number) => {
  let hM = h / 100;
  const result = w / hM ** 2;

  if (result >= 18.5 && result <= 24.9) {
    console.log("Normal (healthy weight)");
  } else if (result <= 18.5) {
    console.log("Bad (underweight)");
  } else {
    console.log("Bad (obese)");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
