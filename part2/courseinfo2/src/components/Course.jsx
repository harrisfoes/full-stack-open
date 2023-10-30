/*
Course
    Header
    Content
        Part
        Part
        ...
*/

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Sum = (props) => {
  console.log(props.exercises);

  const sum = props.exercises
    .map((ele) => ele.exercises)
    .reduce((s, d) => s + d);

  return <div>total of {sum} exercises</div>;
};

const Course = (props) => {
  return (
    <>
      <Header header={props.course.name} />
      {props.course.parts.map((el) => (
        <Part key={el.id} name={el.name} exercises={el.exercises} />
      ))}
      <Sum exercises={props.course.parts} />
    </>
  );
};

export default Course;
