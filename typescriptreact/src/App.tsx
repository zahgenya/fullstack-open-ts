import Header from "./components/Header";
import Content from "./components/Content";
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

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

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
                  <p>{part.description}</p>
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
                  <p>{part.backgroundMaterial}</p>
                </div>
              );
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
      <Content contentParts={courseParts} />
      <Total contentParts={courseParts} />
      <Part />
    </div>
  );
};

export default App;