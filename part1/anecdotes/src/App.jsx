import { useState } from "react";

const Button = ({ label, handleClick }) => {
  return <button onClick={handleClick}>{label}</button>;
};

const Anecdote = ({ text }) => {
  return <p>{text}</p>;
};

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const max = Math.max(...votes);
  const indexOfMax = votes.indexOf(max);

  console.log(max, "max");
  if (max === 0) {
    return <p>No votes yet</p>;
  }

  return (
    <>
      <Anecdote text={anecdotes[indexOfMax]} />
      <p>has {max} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0));

  const selectRandom = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    console.log("selected", rand);
    setSelected(rand);
  };

  const addVote = (selected) => {
    const copy = [...votes];
    copy[selected] += 1;

    setVote(copy);
  };

  const mostVoted = () => {
    const max = Math.max(...votes);
    console.log("max", max);
    console.log("returnme", votes.indexOf(max));

    console.log(ret);
    return ret;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} />
      <p>has {votes[selected]} votes</p>
      <Button label={"vote"} handleClick={() => addVote(selected)} />
      <Button label={"Next anecdote"} handleClick={selectRandom} />
      <h2>Anecdote with most votes</h2>
      <MostVotedAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
