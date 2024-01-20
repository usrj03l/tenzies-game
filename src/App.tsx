import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const check = dice.every((die) => die.value === dice[0].value && die.isHeld === true);
    if (check) setTenzies(true);
  }, [dice]);

  function allNewDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      const dice = Math.floor(Math.random() * 6 + 1);
      diceArr.push({ id: nanoid(), value: dice, isHeld: false });
    }
    return diceArr;
  }

  function rollDice() {
    const newDice = allNewDice();
    for (let i = 0; i < 10; i++) {
      if (dice[i].isHeld) {
        newDice[i] = dice[i];
      }
    }
    setDice(newDice);
  }

  function holdDice(id: string) {
    setDice((prevDice) => prevDice.map((e) => (e.id === id ? { ...e, isHeld: !e.isHeld } : e)));
  }

  const dieElements = dice.map((e) => <Die key={e.id} die={e} holdDice={() => holdDice(e.id)} />);
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">{dieElements}</div>
      {!tenzies && (
        <button className="roll--button" onClick={rollDice}>
          Roll
        </button>
      )}
      {tenzies && (
        <button
          className="new-game"
          onClick={() => {
            setDice(allNewDice());
            setTenzies(false);
          }}
        >
          New Game
        </button>
      )}
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
