import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const App = () => {
  const [player1, setPlayer1] = React.useState(
    localStorage.getItem('player1') || '',
  )
  const [player2, setPlayer2] = React.useState(
    localStorage.getItem('player2') || '',
  )

  const [currentPlayer, setCurrentPlayer] = React.useState(player2)

  const [turn, setTurn] = React.useState('')
  const [tabX] = React.useState([])
  const [tabO] = React.useState([])
  const [Winner, setWinner] = React.useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handeRematch = () => {
    handleClose()
    setPlayer1(player2)
    setPlayer2(player1)
    window.location.reload()
  }

  React.useEffect(() => {
    localStorage.setItem('player1', player1)
    localStorage.setItem('player2', player2)
  })

  const onChangeP1 = (event) => setPlayer1(event.target.value)
  const onChangeP2 = (event) => setPlayer2(event.target.value)
  const playerTurn = (event) => {
    if (turn != 'X') {
      setCurrentPlayer(player1)
    } else {
      setCurrentPlayer(player2)
    }
  }
  const onTurn = (event) => {
    if (event.target.innerText == '') {
      if (turn == 'X') {
        event.target.innerText = 'X'
        tabX.push(event.target.value)
        setTurn('O')
      } else {
        event.target.innerText = 'O'
        tabO.push(event.target.value)
        setTurn('X')
      }
      console.log(tabO, tabX)
    } else {
      alert('Select empty cell')
    }
    winner()
    playerTurn()
  }

  const winner = (event) => {
    if (
      (tabO.includes('0') && tabO.includes('1') && tabO.includes('2')) ||
      (tabO.includes('3') && tabO.includes('4') && tabO.includes('5')) ||
      (tabO.includes('6') && tabO.includes('7') && tabO.includes('8')) ||
      (tabO.includes('0') && tabO.includes('3') && tabO.includes('6')) ||
      (tabO.includes('1') && tabO.includes('4') && tabO.includes('7')) ||
      (tabO.includes('2') && tabO.includes('5') && tabO.includes('8')) ||
      (tabO.includes('0') && tabO.includes('4') && tabO.includes('8')) ||
      (tabO.includes('2') && tabO.includes('4') && tabO.includes('6'))
    ) {
      handleShow()
      setWinner(player2)
    }
    if (
      (tabX.includes('0') && tabX.includes('1') && tabX.includes('2')) ||
      (tabX.includes('3') && tabX.includes('4') && tabX.includes('5')) ||
      (tabX.includes('6') && tabX.includes('7') && tabX.includes('8')) ||
      (tabX.includes('0') && tabX.includes('3') && tabX.includes('6')) ||
      (tabX.includes('1') && tabX.includes('4') && tabX.includes('7')) ||
      (tabX.includes('2') && tabX.includes('5') && tabX.includes('8')) ||
      (tabX.includes('0') && tabX.includes('4') && tabX.includes('8')) ||
      (tabX.includes('2') && tabX.includes('4') && tabX.includes('6'))
    ) {
      handleShow()
      setWinner(player1)
    }
  }

  return (
    <div>
      <p>player : {currentPlayer}, you can play :</p>
      <input
        value={player1}
        placeholder="player1"
        type="text"
        onChange={onChangeP1}
        defaultValue="player1"
      />
      <strong> Play with X </strong>
      <br />
      <input
        value={player2}
        placeholder="player2"
        type="text"
        onChange={onChangeP2}
        defaultValue="player1"
      />
      <strong> Play with O </strong>
      <br />
      <div>
        <Button onClick={onTurn} value="0" className="boardBtn"></Button>
        <Button onClick={onTurn} value="1" className="boardBtn"></Button>
        <Button onClick={onTurn} value="2" className="boardBtn"></Button>
        <br />
        <Button onClick={onTurn} value="3" className="boardBtn"></Button>
        <Button onClick={onTurn} value="4" className="boardBtn"></Button>
        <Button onClick={onTurn} value="5" className="boardBtn"></Button>
        <br />
        <Button onClick={onTurn} value="6" className="boardBtn"></Button>
        <Button onClick={onTurn} value="7" className="boardBtn"></Button>
        <Button onClick={onTurn} value="8" className="boardBtn"></Button>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Rematch ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Good job {Winner} you <strong>WON</strong>, do you want to rematch ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handeRematch}>
              Let's do it !
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default App
