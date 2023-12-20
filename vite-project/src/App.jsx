import React from 'react'
import './App.css'
import Die from './Die'


export default function App() {
  const [dice, setDice] = React.useState(allNewDice)
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    const allDicesHeld = dice.every(die => die.isHeld)

    if(allDicesHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      id: Math.floor(Math.random() * 9000000000) + 1000000000,
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }
  function allNewDice() {
      const newDice = []
      for(let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
  }

  function rollDice() {
    if(!tenzies) {
      setCount({count: count + 1})
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(singleDice => {
    return (
      <Die 
        key={singleDice.id}
        value={singleDice.value}
        isHeld={singleDice.isHeld}
        holdDice={() => holdDice(singleDice.id)}
      />
    )
  })

  return (
    <main>
        <h1 className='title'>{tenzies ? 'Yeah You Won' : 'Tenzies'}</h1>
        <p className='text'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
            {diceElements}
        </div>
        <button className='button' onClick={() => {rollDice(); setCount(count + 1)}}>{tenzies ? "New Game" : "Roll"}</button>
        <p className='button-count'>Your turns: {count}</p>
    </main>
  )
}