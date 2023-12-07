import Header from "./components/Header";
import Total from "./components/Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number
}

interface CoursePartBasic extends CoursePartBase {
  description?: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description?: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const App = () => {
  const courseName = "Half stack application development"
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "Typescript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const Part = () => {
    return (
      <>
        {courseParts.map((part) => {
          switch (part.kind) {
            case "basic":
              return (
                <div key={part.name}>
                  <h2>
                    {part.name} {part.exerciseCount}
                  </h2>
                  {part.description && <p>{part.description}</p>}
                </div>
              );
            case "group":
              return (
                <div key={part.name}>
                  <h2>
                    {part.name} {part.exerciseCount}
                  </h2>
                  <p>Project exercises {part.groupProjectCount}</p>
                </div>
              );
            case "background":
              return (
                <div key={part.name}>
                  <h2>
                    {part.name} {part.exerciseCount}
                  </h2>
                  {part.description && <p>{part.description}</p>}
                  <p>{part.backgroundMaterial}</p>
                </div>
              );
              case "special":
                return (
                  <div key={part.name}>
                    <h2>
                      {part.name} {part.exerciseCount}
                    </h2>
                    <p>{part.description}</p>
                    <p>required skills: {part.requirements.join(', ')}</p>
                  </div>
                )
            default:
              return null;
          }
        })}
      </>
    );
  };
  

  return (
    <div>
      <Header name={courseName}/>
      <Part />
      <Total contentParts={courseParts} />
    </div>
  );
};

export default App;