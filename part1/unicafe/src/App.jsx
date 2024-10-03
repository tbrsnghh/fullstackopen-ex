import { useState } from "react";

const Button = ({ name, handleClick }) => {
  return (
    <button onClick={() => handleClick((prev) => prev + 1)}>{name}</button>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.name}
      </td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const positive = (100 * good) / total;
  const average = (good - bad) / total

  return total > 0 ? (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="all" value={total} />
          <StatisticLine name="average" value={average} />
          <StatisticLine name="positive" value={`${positive}%`} />
        </tbody>
      </table>
    </>
  ) : (
    <div>
      <h2>statistics</h2>
      No Feedback Given
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={setGood} />
      <Button name="neutral" handleClick={setNeutral} />
      <Button name="bad" handleClick={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
