const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Total = ({ sumOfExercises }) => {
  const styles = {
    fontWeight: "bold",
  };
  return (
    <p style={styles}>Number of exercises {sumOfExercises}</p>
  );
};

const Part = ({ name, exercises }) => {
  const styles = {
    listStyle: 'none',
    marginBottom: "10px", 
  }
  return (
    <li style={styles}>
      <p>{name} {exercises}</p>
    </li>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <div>
      <Header course={name} />
      <ul style={{paddingLeft : "0px"}}>
        {parts.map((part) => (
          <Part
            key={part.id}
            name={part.name}
            exercises={part.exercises}
          />
        ))}
      </ul>
      <Total sumOfExercises={totalExercises} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];


  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;