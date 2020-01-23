import React, { useState } from 'react';
import {
  getNoteSet,
  getNoteAtSemiOffset,
} from './helpers/music'
import './App.css';

import Staff from './Staff'
import Fretboard from './Fretboard'

// Some stuff that might be adjustable in the future
let tuning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']
const frets = 12

const notesOnGuitar = getNoteSet(
  getNoteAtSemiOffset(tuning[0], frets),
  tuning[tuning.length - 1]
)

function randomIndex(arr) {
  return Math.floor(Math.random() * (arr.length + 1));
}

function App() {
  const [noteIndex, setNoteIndex] = useState(randomIndex(notesOnGuitar))
  const [showAnswer, setShowAnswer] = useState(false)
  const [showAll, setShowAll] = useState(false)

  function getNewQuestion() {
    setShowAnswer(false)
    setShowAll(false)
    setNoteIndex(randomIndex(notesOnGuitar))
  }

  return (
    <div className="App">
      <Staff note={notesOnGuitar[noteIndex]}
        width="525"
        height="200"
        transpose />
      <Fretboard note={notesOnGuitar[noteIndex]}
        tuning={tuning}
        frets={frets}
        width="525"
        height="200"
        showNote={showAnswer}
        showAllNotes={showAll} />
      <div className="controls">
        <button onClick={() => setShowAll(!showAll)}>
          { showAll ? 'Hide' : 'Show' } All Notes
        </button>

        <button onClick={getNewQuestion}>
          New Question
        </button>

        {
          !showAnswer && (
            <button onClick={() => setShowAnswer(true)}>
              Show Answer
            </button>
          )
        }
      </div>
    </div>
  );
}

export default App;
