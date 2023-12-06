import React from "react";
import { contentProps } from "../types";

const Content: React.FC<contentProps> = ({ contentParts }) => {
  return (
    <>
    {contentParts.map((part, index) => (
      <div key={index}>
        <p>{part.name} {part.exerciseCount}</p>
      </div>
    ))}
    </>
  )
}

export default Content;