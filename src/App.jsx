import React from 'react';
import Die from './components/Die';
import "./App.css";
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'
import { useRef } from 'react';

const App = () => {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const allDices = dice.map((die) =>
  (
    <Die key={die.id} value={die.value} isHeld={die.isHeld}
      holdDice={() => holdDice(die.id, die.value)} tenzies={tenzies} />
  ))

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstDieValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstDieValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice])

  function allNewDice() {
    let diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(newDie())
    }
    return diceArr
  }

  function newDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function holdDice(id, value) {
    setDice(prevDice => prevDice.map(die => {
      if (die.value !== value && die.id !== id) {
        return { ...die, isHeld: false }
      }
      return die.id === id ? { ...die, isHeld: true } : die
    }))
  }

  function onRoll() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
    }
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : newDie()
    }))
  }

  return (
    <div class="container">
      <div className='App'>
        {tenzies && <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={100} />}
        <section class="section">
          <section class="section">
            <div className="game-title">
              <h1>Tenzies Game</h1>
              <p>Roll until all dice are the same.</p>
            </div>
            <div className="grid-die">
              {allDices}
            </div>
            <div className='button-div'>
              {<button onClick={onRoll}>{tenzies ? 'New game' : 'Roll'}</button>}
            </div>
          </section>

        </section>

      </div >
    </div>
  )
}

export default App