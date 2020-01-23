import React from 'react'
import {
  getNoteSet,
  getNoteAtSemiOffset,
} from './helpers/music'

export default function Fretboard({
  note,
  tuning,
  frets,
  width,
  height,
  showNote = true,
  showAllNotes = true
}) {
  const margin = 20
  const doubleMargin = margin * 2
  const stringDist = Math.round((height - doubleMargin) / (tuning.length - 1))
  const fretDist = Math.round((width - doubleMargin) / frets)

  const notesOnStrings = tuning.map(low => {
    const high = getNoteAtSemiOffset(low, frets)
    return getNoteSet(high, low)
  })

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {
        // Strings and string notes
        tuning.map((note, index) => {
          const y = stringDist * index + margin
          return (
            <g key={index}>
              <text x="0"
                y={y}
                fontSize="11"
                dominantBaseline="middle">
                { note }
              </text>
              <line x1={margin}
                x2={width - margin}
                y1={y}
                y2={y}
                stroke="black" />
            </g>
          )
        })
      }

      {
        // Frets
        [...Array(frets + 1).keys()].map(fret => {
          const x = fretDist * fret + margin
          return (
            <line x1={x}
              x2={x}
              y1={margin}
              y2={height - margin}
              stroke="black"
              key={fret} />
          )
        })
      }

      {
        [3, 5, 7, 9].map(dot => {
          const x = Math.floor(margin + (dot * fretDist) - fretDist / 2)
          const y = Math.floor(height / 2)
          return (
            <ellipse cx={x}
              cy={y}
              rx="8"
              ry="8"
              stroke="black"
              fill="black" />
          )
        })
      }

      <ellipse cx={Math.floor(margin + (12 * fretDist) - fretDist / 2)}
        cy={Math.floor(margin + stringDist + stringDist / 2)}
        rx="8"
        ry="8"
        stroke="black"
        fill="black" />
      <ellipse cx={Math.floor(margin + (12 * fretDist) - fretDist / 2)}
        cy={Math.floor(margin + (stringDist * 3) + stringDist / 2)}
        rx="8"
        ry="8"
        stroke="black"
        fill="black" />

      {
        notesOnStrings.map((notes, index1) => {
          const y = margin + (stringDist * index1)
          return (
            <g key={index1}>
              {
                notes.slice(1).map((currNote, index2) => {
                  const x = margin + (index2 * fretDist) + Math.floor(fretDist / 2)
                  const show = showAllNotes || (note === currNote && showNote)
                  return (
                    <g className={show ? '' : 'hide'}
                      key={index2}>
                      <ellipse cx={x}
                        cy={y}
                        rx="10"
                        ry="10"
                        stroke="black"
                        fill="white" />
                      <text x={x}
                        y={y}
                        fontSize="8"
                        dominantBaseline="middle"
                        textAnchor="middle">
                        { currNote }
                      </text>
                    </g>
                  )
                })
              }
            </g>
          )
        })
      }
    </svg>
  )
}