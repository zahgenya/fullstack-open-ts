import React from "react";
import { contentProps } from "../types";

const Total: React.FC<contentProps> = ({ contentParts }) => {
  const totalExercises = contentParts.reduce((total, parts) => total + parts.exerciseCount, 0)

  return (
    <>
    <p>
    Total number of exercises {totalExercises}
    </p>
    </>
  )
}

export default Total