import React from "react";
import { ReactDOM } from "react";
import './index.css'
import Die from '../components/Die.js'
import { nanoid } from "nanoid";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from 'react-confetti'

function App() {

  const [diceValue, setDiceValue] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  tenzies === true ? console.log("You win!") : console.log("Continue!")

  React.useEffect(() => {
      const win = diceValue.every(dice => {
        return (dice.isHeld === true && diceValue[0].value === dice.value)
      })
      if (win === true) {
        setTenzies(true)
      }
  }, [diceValue])

  function generateNewDie() {
    return { 
      id: nanoid(),
      value: `${Math.ceil(Math.random() * 6)}`,
      isHeld: false
    }
  }
    
  function allNewDice() {
      const newArray = []
      for (let i = 0; i < 10; i++) {
          const newObject = generateNewDie()
          newArray.push(newObject)
      }
      return newArray
  }
  
  function rollDice() {
    if (tenzies === false) {
      const newRoll = [...diceValue]
      const newRollArray = newRoll.map(dice => {
        return dice.isHeld 
          ? dice
          : generateNewDie()
        })
      setDiceValue(newRollArray)
    } else {
      setDiceValue(allNewDice())
      setTenzies(false)
    }

  }

  function holdDice(diceId) {
    setDiceValue(prevDiceValue => prevDiceValue.map(dice => {
      return dice.id === diceId 
        ? {...dice, isHeld: !dice.isHeld} 
        : dice
    }))
  }

  const dieElements = diceValue.map(die => <Die
    key={die.id}
    id={die.id}
    value={die.value}
    isHeld={die.isHeld}
    hold={holdDice}
  />)

  return(
    <main>
      {tenzies && <Confetti />}
      <div className="gameTitle">
        <h1 className="tenzies">Tenzies</h1>
        <p className="gameInstructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dieContainer">
        {dieElements}
      </div>
      <button className="rollButton" onClick={rollDice}>{tenzies === true ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App;