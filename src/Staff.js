import React, { useEffect, useRef } from 'react'
import Vex from 'vexflow'

import {
  splitNoteOctave,
  combineNoteOctave,
} from './helpers/music'

export default function Staff({
  note = 'C#5',
  width,
  height,
  transpose,
}) {
  const vfRef = useRef()

  const [ baseNote, octave ] = splitNoteOctave(note)
  const octaveOffset = transpose ? 1 : 0
  const modifiedNote = combineNoteOctave(baseNote, octave + octaveOffset)

  useEffect(() => {
    if (!vfRef.current) {
      vfRef.current = new Vex.Flow.Factory({
        renderer: {
          elementId: 'staff',
          width,
          height
        }
      })
    }
    var vf = vfRef.current
    vf.context.clear()
    
    var score = vf.EasyScore();
    var system = vf.System();
    
    system.addStave({
      voices: [
        score.voice(score.notes(modifiedNote + '/w'))
      ]
    })
    .addClef('treble')
    
    vf.draw();
  })

  return (
    <div id="staff"></div>
  )
}