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

export default Course;
