const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {

  return props.parts.map((element, key) => {
    return <Part name={element.name} exercises={element.exercises} key={key} />;
  });
};

const Total = (props) => {

  const sum = props.total.reduce((total, item) => {
    return total + item.exercises;
  }, 0);

  return <p>{sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts} />
    </div>
  );
};

export default App;
